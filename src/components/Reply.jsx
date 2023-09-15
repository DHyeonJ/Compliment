import React, { useState, useEffect, useCallback } from 'react'
import { styled } from 'styled-components'
import defaultProfileImage from '../img/anonymous.png'
import commentImg from '../img/comment.png'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { collection, query, where, getDocs, limit } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { addReply, deleteReply, getReplyApi, updateReply } from '../api/ReplyApi'
import { sortData } from '../utils/sort'

function Reply() {
  const { id } = useParams()
  const nowTime = moment().format('YYYY-MM-DD')

  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [replyData, setReplyData] = useState([])
  const [commentLimit, setCommentLimit] = useState(4)
  const [totalCount, setTotalCount] = useState(0)

  const [replyContent, setReplyContent] = useState('') // 댓글 입력내용
  const [isEditing, setIsEditing] = useState(false)
  const [editedReplyContent, setEditedReplyContent] = useState('')
  const [editingReplyId, setEditingReplyId] = useState(null)
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true)

  const localUserid = JSON.parse(localStorage.getItem('user'))
  const email = localUserid?.email

  const fetchReplyData = useCallback(async () => {
    if (!id) return

    const data = await getReplyApi({ id, count: commentLimit })
    const allData = await getReplyApi({ id })
    setReplyData(sortData(data, 'timeSort'))
    setTotalCount(allData.length)
  }, [commentLimit])

  const loadMoreComments = () => setCommentLimit(commentLimit + 5)

  useEffect(() => {
    fetchReplyData()
  }, [fetchReplyData])

  const addNewReply = async () => {
    if (!user) {
      window.alert('댓글을 작성하려면 먼저 로그인하세요.')
      navigate('/login')
      return
    }

    const replyId = Date.now().toString()
    const timeSort = Date.now()

    const newReplyList = {
      id: replyId,
      userEmail: user ? user.email : '', // 사용자의 이메일
      ContentId: id,
      reply: replyContent,
      Date: nowTime,
      timeSort,
      photoURL: user ? user.photoURL : '', // 사용자의 프로필 사진 URL
      replyId,
    }

    if (replyContent.trim() === '') {
      alert('댓글을 입력해주세요.')
      return
    }

    try {
      await addReply({ newReplyList, replyId })
      await fetchReplyData()
      setReplyContent('')
    } catch (error) {
      console.error('문서 추가 오류: ', error)
    }
  }

  const handleChangeReplyContent = (e) => {
    setReplyContent(e.target.value)
  }

  const onEditHandler = (replyId) => {
    setIsEditing(true)
    setEditingReplyId(replyId)

    // 수정 중인 댓글을 찾고 텍스트 영역에 해당 내용을 설정합니다.
    const editedComment = replyData.find((comment) => comment.id === replyId)
    if (editedComment) {
      setEditedReplyContent(editedComment.reply)
    }
  }

  // reply update
  const onSaveEditHandler = async () => {
    if (editedReplyContent.trim() === '') {
      alert('댓글을 입력해주세요.')
      return
    }

    try {
      await updateReply({
        targetId: editingReplyId,
        editedReply: editedReplyContent,
      })

      const updatedReplyData = replyData.map((comment) => {
        if (comment.id === editingReplyId) {
          return { ...comment, reply: editedReplyContent }
        }
        return comment
      })

      setReplyData(updatedReplyData)

      setIsEditing(false)
      setEditingReplyId(null)
    } catch (error) {
      console.error('댓글 수정에 실패했습니다.', error)
    }
  }

  const deleteComment = async (replyId) => {
    const shouldDelete = window.confirm('정말로 삭제하시겠습니까?')
    if (shouldDelete) {
      try {
        await deleteReply(replyId)
        await fetchReplyData()
      } catch (error) {
        console.error('댓글 삭제 오류: ', error)
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // 엔터 키를 누르면 댓글을 등록합니다.
      addNewReply()
    }
  }

  useEffect(() => {
    fetchReplyData()
  }, [commentLimit]) // commentLimit가 변경될 때 fetchReplyData 함수를 호출합니다.

  //

  useEffect(() => {
    fetchReplyData()
  }, [commentLimit])

  // totalCount를 업데이트할 함수 추가

  // useEffect(() => {
  //   updatetotalCount()
  // }, [id]) // 게시글 ID가 변경될 때 totalCount를 업데이트합니다.

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user)
      else setUser(null)
    })

    return () => unsubscribe()
  }, [])

  return (
    <>
      <CommentHeaderBox>
        <img src={commentImg} alt="" />
        칭찬 댓글 ({totalCount}개) {/* totalCount를 추가하여 표시 */}
      </CommentHeaderBox>

      <Boxs>
        <CommentBox>
          <CommentBodyBox>
            {replyData?.map((comment) => (
              <CommentAreaBox key={comment.id}>
                {isEditing && editingReplyId === comment.id ? (
                  <div>
                    <UserBox>
                      <UserImg src={comment.photoURL ?? defaultProfileImage} alt="" />
                      <UserName>{comment.userEmail.split('@')[0]}</UserName>
                    </UserBox>
                    <EditInput value={editedReplyContent} onChange={(e) => setEditedReplyContent(e.target.value)} />
                    <EditBtn onClick={onSaveEditHandler}>저장</EditBtn>
                    <DateBox>작성일 {comment.Date}</DateBox>
                  </div>
                ) : (
                  <>
                    <UserBox>
                      <UserImg src={comment.photoURL ?? defaultProfileImage} alt="" />
                      <UserName>{comment.userEmail.split('@')[0]}</UserName>
                    </UserBox>
                    <CommentTextBox>{comment.reply}</CommentTextBox>
                    <DateBox>작성일 {comment.Date}</DateBox>

                    <BtnAreaBox>
                      {user && (user.email === comment.userEmail || user.email === 'admin@admin.com') && (
                        <UserBtnBox>
                          <EditBtn onClick={() => onEditHandler(comment.id)}>수정</EditBtn>
                          <EditBtn onClick={async () => await deleteComment(comment.id)}>삭제</EditBtn>
                        </UserBtnBox>
                      )}
                    </BtnAreaBox>
                  </>
                )}
              </CommentAreaBox>
            ))}
          </CommentBodyBox>
        </CommentBox>
        {/* "더 보기" 버튼 추가 */}
        {replyData.length < totalCount && <LoadMoreButton onClick={loadMoreComments}>더 보기</LoadMoreButton>}

        <CommentInputAreaBox>
          <CommentInputMiddleBox>
            <UserBox>
              <UserImg src={user?.photoURL ?? defaultProfileImage} alt="" />
              <UserName>{user?.email.split('@')[0]}</UserName>
            </UserBox>
            <CommentInputBox value={replyContent} onKeyPress={handleKeyPress} onChange={handleChangeReplyContent} placeholder="사람들의 이야기에 응답해주세요. 한마디의 칭찬은 모두에게 긍정의 힘으로 돌아옵니다." />
            <ButtonBox>
              <Button onClick={addNewReply}>등록</Button>
            </ButtonBox>
          </CommentInputMiddleBox>
        </CommentInputAreaBox>
      </Boxs>
    </>
  )
}

export default Reply

const Boxs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LoadMoreButton = styled.button`
  margin-right: 8px;
  display: flex;
  width: 80px;
  height: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  color: #666666;
  background-color: transparent;
  margin-bottom: 20px;

  &:hover {
    background-color: transparent;
    color: #986c6c;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 157.143% */
    display: flex;
    color: #986c6c;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 157.143% */
    width: 80px;
    height: 32px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 8px;
    border: 1px solid #986c6c;
    cursor: pointer; // 선택적으로 추가. 마우스 커서를 포인터로 변경합니다.
  }
`

const UserBox = styled.div`
  /* display 관련 */
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 10px;
`
const UserImg = styled.img`
  /* size 관련 */
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 60px;
  margin-right: 8px;
`
const UserName = styled.div`
  /* border 관련 */
  margin-right: 1.5rem;
  /* border 관련 */
  line-height: 1.75rem;
  border-radius: 50%;
  /* font 관련 */
  color: var(--text01_404040, #404040);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
`
const CommentAreaBox = styled.div`
  width: 912px;
  margin-bottom: 10px;
  border-bottom-style: dotted;
  border-bottom: 1px solid #d9d9d9;
  padding: 16px 24px 16px 24px;
`
const CommentTextBox = styled.div`
  align-self: stretch;
  color: var(--text01_404040, #404040);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
`
const DateBox = styled.div`
  /* border 관련 */
  line-height: 1.75rem;
  /* font 관련 */
  color: var(--text01_404040, #999999);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  margin-top: 12px;
`
const ButtonBox = styled.div`
  /* display 관련 */
  display: flex;
  gap: 1rem;
`
const Button = styled.button`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 1rem;
  bottom: 2rem;
  /* size 관련 */
  width: 6rem;
  height: 2.25rem;
  /* background 관련 */
  background: #fff;
  /* border 관련 */
  border-radius: 0.5rem;
  border: 1px solid #d9d9d9;
  /* animation 관련 */
  &:hover {
    cursor: pointer;
    border-radius: 8px;
    background: #986c6c;
    color: white;
    border: none;
  }
`

const CommentHeaderBox = styled.div`
  /* display 관련 */
  display: flex;
  align-items: center;
  gap: 1rem;
  /* size 관련 */
  width: 57rem;
  /* margin, padding */
  padding: 1.5rem;
  /* border 관련 */
  line-height: 1.375rem;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  /* font 관련 */
  color: #404040;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
`
const CommentBox = styled.div`
  /* display 관련 */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  align-self: stretch;
  /* size 관련 */
  width: 57rem;
  min-width: 50rem;
  max-width: 90rem;
  /* margin, padding */
  padding: 1rem 1.5rem;
`

const CommentBodyBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
  margin-bottom: 10px;
`
const CommentInputAreaBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  /* size 관련 */
  width: 57rem;
  height: 200px;
  /* margin, padding */
  padding: 1rem;
  margin-bottom: 15px;
  /* background 관련 */
  background: #fff;
  /* border 관련 */
  border-radius: 0.5rem;
  border: 1px solid #d9d9d9;
`
const CommentInputMiddleBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  /* size 관련 */
  min-width: 50rem;
  max-width: 90rem;
  /* margin, padding */
  padding: 1rem 1.5rem;
`
const CommentInputBox = styled.input`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  flex: 1 0 0;
  border: none;
  /* size 관련 */

  min-width: 35rem;
  max-width: 74.625rem;
  /* margin, padding */
  padding: 1.5rem 0;
  margin-left: 2rem;
  &:focus {
    outline: none;
  }
`
const BtnAreaBox = styled.div`
  position: relative;
  width: 100%;
`

const UserBtnBox = styled.div`
  display: flex;

  position: absolute;
  right: 0rem;
  bottom: 0rem;
`

const EditInput = styled.input`
  margin-top: 10px;
  margin-bottom: 12px;
  width: 100%;
  height: 600%;
  border: 1px solid #d9d9d9;
  margin-right: 30px;
  font-size: 16px;
  border-radius: 8px;

  padding: 3px 15px 3px 15px;
  &:focus {
    outline: none;
    border-radius: 8px;
  }
`
const EditBtn = styled.button`
  margin-right: 8px;
  display: flex;
  width: 80px;
  height: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  color: #666666;
  background-color: transparent;

  &:hover {
    background-color: transparent;
    color: #986c6c;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 157.143% */
    display: flex;
    color: #986c6c;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 157.143% */
    width: 80px;
    height: 32px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 8px;
    border: 1px solid #986c6c;
    cursor: pointer; // 선택적으로 추가. 마우스 커서를 포인터로 변경합니다.
  }
`
