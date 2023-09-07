import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import defaultProfileImage from '../img/user.png'
import commentImg from '../img/comment.png'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { addReply, deleteReply, getReplyApi, updateReply } from '../api/ReplyApi'

function Reply() {
  const { id } = useParams()
  const nowTime = moment().format('YYYY-MM-DD')

  const [replyData, setReplyData] = useState([])
  const [replyContent, setReplyContent] = useState('')
  const userData = localStorage.getItem('user')
  const parsedUserData = JSON.parse(userData)
  const userEmail = parsedUserData.email
  const userPhotoURL = parsedUserData.photoURL
  const [isEditing, setIsEditing] = useState(false) // 수정 모드 여부를 나타내는 상태 변수
  const [editedReplyContent, setEditedReplyContent] = useState('') // 수정할 내용을 저장하는 상태 변수
  const [editingReplyId, setEditingReplyId] = useState(null) // 현재 수정 중인 댓글 ID
  const admin = 'admin@admin.com'

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
        return replyData
      } catch (error) {
        console.error('Error fetching user reply:', error)
        return []
      }
    }
    return []
  }

  useEffect(() => {
    fetchReplyData()
  }, [])

  const addNewReply = async () => {
    const replyId = Date.now().toString()
    const newReplyList = {
      id: replyId,
      userEmail,
      ContentId: id,
      reply: replyContent,
      Date: nowTime,
      photoURL: userPhotoURL,
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
      console.error('Error adding document: ', error)
    }
  }

  const handleChangeReplyContent = (e) => {
    setReplyContent(e.target.value)
  }

  const onEditHandler = (replyId) => {
    setIsEditing(true)
    setEditingReplyId(replyId)

    // Find the comment being edited and set its content in the textarea
    const editedComment = replyData.find((comment) => comment.id === replyId)
    if (editedComment) {
      setEditedReplyContent(editedComment.reply)
    }
  }

  // Function to save the edited content
  const onSaveEditHandler = async () => {
    if (editedReplyContent.trim() === '') {
      alert('댓글을 입력해주세요.')
      return
    }

    try {
      // Update the comment content
      await updateReply({
        targetId: editingReplyId,
        editedReply: editedReplyContent,
      })

      // Update the comment data in the state
      const updatedReplyData = replyData.map((comment) => {
        if (comment.id === editingReplyId) {
          return { ...comment, reply: editedReplyContent }
        }
        return comment
      })

      setReplyData(updatedReplyData)

      // Exit edit mode
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
        칭찬 댓글
      </CommentHeaderBox>
      <CommentBox>
        <CommentBodyBox>
          {replyData?.map((comment) => (
            <div key={comment.id}>
              {isEditing && editingReplyId === comment.id ? (
                // 수정 모드에서는 입력란을 표시하고 저장 버튼을 렌더링
                <div>
                  <input value={editedReplyContent} onChange={(e) => setEditedReplyContent(e.target.value)} />
                  <button onClick={onSaveEditHandler}>저장</button>
                </div>
              ) : (
                // 수정 모드가 아닐 때는 수정 버튼을 렌더링
                <>
                  <UserBox>
                    <UserImg src={comment.photoURL ?? defaultProfileImage} alt="" />
                    <UserName>{comment.userEmail}</UserName>
                  </UserBox>
                  {comment.reply}
                  <DateBox>작성일 {comment.Date}</DateBox>

                  <div>
                    <button onClick={() => onEditHandler(comment.id)}>수정</button>
                    <button onClick={async () => await deleteComment(comment.id)}>삭제</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </CommentBodyBox>
      </CommentBox>
      <CommentInputAreaBox>
        <CommentInputMedleBox>
          <UserBox>
            <UserImg src={userPhotoURL ?? defaultProfileImage} alt="" />
            <UserName>{userEmail}</UserName>
          </UserBox>
          <CommentInputBox value={replyContent} onChange={handleChangeReplyContent} />
          <ButtonBox>
            <Button onClick={addNewReply}>등록</Button>
          </ButtonBox>
        </CommentInputMedleBox>
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
`
const UserImg = styled.img`
  /* size 관련 */
  width: 2.25rem;
  height: 2.25rem;
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
const DateBox = styled.div`
  /* border 관련 */
  line-height: 1.75rem;
  /* font 관련 */
  color: var(--text01_404040, #404040);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
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
  /* size 관련 */
  width: 6rem;
  height: 2.25rem;
  /* background 관련 */
  background: #fff;
  /* border 관련 */
  border-radius: 0.5rem;
  border: 1px solid #d9d9d9;
  /* animation 관련 */
  cursor: pointer;
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
`
const CommentInputAreaBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  /* size 관련 */
  width: 57rem;
  /* margin, padding */
  padding: 1rem;
  /* background 관련 */
  background: #fff;
  /* border 관련 */
  border-radius: 0.5rem;
  border: 1px solid #d9d9d9;
`
const CommentInputMedleBox = styled.div`
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
  /* size 관련 */
  min-width: 35rem;
  max-width: 74.625rem;
  /* margin, padding */
  padding: 1.5rem 0;
`
