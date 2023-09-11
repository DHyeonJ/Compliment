import { collection, getDocs, setDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db, useAuth } from '../firebase'

const getLists = async () => {
  const querySnapShot = await getDocs(collection(db, 'lists'))
  const fetchData = querySnapShot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
  return fetchData
}

const addList = async ({ newList, id }) => {
  const newLists = await setDoc(doc(db, 'listss', id), newList)
  return newLists
}

const deleteList = async (targetId) => {
  await deleteDoc(doc(db, 'lists', targetId))
}

const updateList = async ({ targetId, editedList }) => {
  await updateDoc(doc(db, 'lists', targetId), editedPost)
}

const useIsAuthenticated = () => {
  const auth = useAuth() // Firebase에서 인증 객체를 가져옵니다.

  // 사용자가 인증되었는지 여부를 확인합니다.
  const isAuthenticated = !!auth.currentUser

  return isAuthenticated
}

export { getLists, addList, deleteList, updateList, useIsAuthenticated }
