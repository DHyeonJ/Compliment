import { collection, getDocs, setDoc, updateDoc, deleteDoc, doc, query, where, limit, startAt } from 'firebase/firestore'
import { db, useAuth } from '../firebase'

const getLists = async (count) => {
  const temp = collection(db, 'lists')

  const totalCount = query(temp)
  const q = query(temp, limit(count))

  const querySnapShot = await getDocs(q)
  // console.log(querySnapShot.data().count)

  // count를 위한 api 호출
  const countSnapShot = await getDocs(totalCount)

  const fetchData = querySnapShot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))

  // countSnapShot.size 이게 데이터 전체 길이를 반환

  return { totalCount: countSnapShot.size, fetchData }
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
