import { collection, getDocs, setDoc, updateDoc, deleteDoc, doc, addDoc, query, where, limit, orderBy } from 'firebase/firestore'
import { auth, db } from '../firebase'

// 매개변수 ID로 받아서 query where사용
const getReplyApi = async ({ id, count }) => {
  let q
  const replyRef = collection(db, 'reply')

  if (!count) {
    q = query(replyRef, where('ContentId', '==', id), orderBy('timeSort', 'desc'))
  } else {
    q = query(replyRef, where('ContentId', '==', id), orderBy('timeSort', 'desc'), limit(count))
  }

  const querySnapshot = await getDocs(q)

  const result = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))

  return result
}

const addReply = async ({ newReplyList, replyId }) => {
  const newReply = await setDoc(doc(db, 'reply', replyId), newReplyList)
  return newReply
}

const deleteReply = async (targetId) => {
  await deleteDoc(doc(db, 'reply', targetId))
}

// const updateReply = async ({ targetId, editedList }) => {
//   await updateDoc(doc(db, 'reply', targetId), editedList)
// }
const updateReply = async ({ targetId, editedReply }) => {
  const replyRef = doc(db, 'reply', targetId)
  try {
    await updateDoc(replyRef, {
      reply: editedReply, // 업데이트할 필드와 값을 포함하는 객체
    })
  } catch (error) {
    console.error('댓글 업데이트 오류:', error)
    throw error
  }
}
export { getReplyApi, addReply, deleteReply, updateReply }
