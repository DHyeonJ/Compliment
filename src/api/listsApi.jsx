import { collection, getDocs, setDoc, updateDoc, deleteDoc, doc, query, where, limit, startAt } from 'firebase/firestore'
import { db, useAuth } from '../firebase'

const getLists = async () => {
  const temp = collection(db, 'lists')

  const q = query(temp)

  const querySnapShot = await getDocs(q)

  const fetchData = querySnapShot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))

  return fetchData
}

const getMyFriends = async (uid) => {
  const listsRef = collection(db, 'lists')
  const q = query(listsRef, where('userId', '==', uid))
  const querySnapshot = await getDocs(q)
  const data = []
  querySnapshot.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
    })
  })
  return { data }
}

const getMyLikeFriends = async (userUid) => {
  const listsRef = collection(db, 'lists')
  const q = query(listsRef, where('likedUser', 'array-contains', userUid))
  const querySnapshot = await getDocs(q)
  const data = []
  querySnapshot.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
    })
  })
  return { data }
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
  const auth = useAuth()

  const isAuthenticated = !!auth.currentUser

  return isAuthenticated
}

export { getLists, addList, deleteList, updateList, useIsAuthenticated, getMyFriends, getMyLikeFriends }
