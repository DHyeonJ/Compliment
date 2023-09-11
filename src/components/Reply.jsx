import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import defaultProfileImage from '../img/anonymous.png'
import commentImg from '../img/comment.png'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { addReply, deleteReply, getReplyApi, updateReply } from '../api/ReplyApi'

function Reply() {
  const { id } = useParams()
  const nowTime = moment().format('YYYY-MM-DD')

  const [replyData, setReplyData] = useState([])
  const [replyContent, setReplyContent] = useState('')
  const [user, setUser] = useState(null) // 사용자 정보를 저장할 상태 변수
  const [isEditing, setIsEditing] = useState(false)
  const [editedReplyContent, setEditedReplyContent] = useState('')
  const [editingReplyId, setEditingReplyId] = useState(null)

  useEffect(() => {
    // Firebase에서 사용자 로그인 상태를 관찰합니다.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // 사용자가 로그인한 경우, 사용자 정보를 설정합니다.
        setUser(user)
      } else {
        // 사용자가 로그아웃한 경우, 사용자 정보를 null로 설정합니다.
        setUser(null)
      }
    })

    // 컴포넌트가 언마운트될 때 Firebase 구독을 정리합니다.
    return () => unsubscribe()
  }, [])

  const fetchReplyData = async () => {
    if (id) {
      const replyRef = collection(db, 'reply')
      const q = query(replyRef, where('ContentId', '==', id))

      try {
        const querySnapshot = await getDocs(q)
        const updatedReplyData = []
        querySnapshot.forEach((doc) => {
          const replyData = doc.data()
          replyData.id = doc.id
          updatedReplyData.push(replyData)
        })
        setReplyData(updatedReplyData)
      } catch (error) {
        console.error('댓글 가져오기 오류:', error)
      }
    }
  }

  useEffect(() => {
    fetchReplyData()
  }, [])

  const addNewReply = async () => {
    if (!user) {
      // 사용자가 로그인하지 않은 경우 알림창 표시
      window.alert('댓글을 작성하려면 먼저 로그인하세요.')
      return
    }

    const replyId = Date.now().toString()
    const newReplyList = {
      id: replyId,
      userEmail: user ? user.email : '', // 사용자의 이메일
      ContentId: id,
      reply: replyContent,
      Date: nowTime,
      photoURL: user ? user.photoURL : '', // 사용자의 프로필 사진 URL
      replyId,
    }

    if (replyContent.trim() === '') {
      alert('댓글을 입력해주세요.')
      return
    }

    try {
      await addReply({ newReplyList, replyId })
      setReplyData([...replyData, newReplyList])
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
    try {
      await deleteReply(replyId)
      const updatedReplyData = replyData.filter((comment) => comment.id !== replyId)
      setReplyData(updatedReplyData)
    } catch (error) {
      console.error('댓글 삭제 오류: ', error)
    }
  }

  return (
    <>
      <CommentHeaderBox>
        <img src={commentImg} alt="" />
        칭찬 댓글 {replyData.length}
      </CommentHeaderBox>
      <CommentBox>
        <CommentBodyBox>
          {replyData?.map((comment) => (
            <CommentAreaBox key={comment.id}>
              {isEditing && editingReplyId === comment.id ? (
                <div>
                  <UserBox>
                    <UserImg src={comment.photoURL ?? defaultProfileImage} alt="" />
                    <UserName>{comment.userEmail}</UserName>
                  </UserBox>
                  <EditInput value={editedReplyContent} onChange={(e) => setEditedReplyContent(e.target.value)} />
                  <EditBtn onClick={onSaveEditHandler}>저장</EditBtn>
                  <DateBox>작성일 {comment.Date}</DateBox>
                </div>
              ) : (
                <>
                  <UserBox>
                    <UserImg src={comment.photoURL ?? defaultProfileImage} alt="" />
                    <UserName>{comment.userEmail}</UserName>
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
      <CommentInputAreaBox>
        <CommentInputMiddleBox>
          <UserBox>
            <UserImg src={user?.photoURL ?? defaultProfileImage} alt="" />
            <UserName>{user?.email}</UserName>
          </UserBox>
          <CommentInputBox value={replyContent} onChange={handleChangeReplyContent} placeholder="사람들의 이야기에 응답해주세요. 한마디의 칭찬은 모두에게 긍정의 힘으로 돌아옵니다." />
          <ButtonBox>
            <Button onClick={addNewReply}>등록</Button>
          </ButtonBox>
        </CommentInputMiddleBox>
      </CommentInputAreaBox>
    </>
  )
}

export default Reply
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
    background-color: #f4f1e9;
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
  align-items: flex-start;
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
  align-items: flex-start;
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
  position: absolute;
  right: 0rem;
  bottom: 0rem;
`

const EditInput = styled.input`
  width: 80%;
  height: 200%;
  border: 1px solid #d9d9d9;
  margin-right: 30px;
  font-size: 16px;

  padding: 3px 15px 3px 15px;
  &:focus {
    outline: none;
  }
`
const EditBtn = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 10px;
  background-color: #f4f1e9;
  margin-right: 5px;
  border: none;

  &:hover {
    background-color: #999999;
    color: #f4f1e9;
    cursor: pointer; // 선택적으로 추가. 마우스 커서를 포인터로 변경합니다.
  }
`
