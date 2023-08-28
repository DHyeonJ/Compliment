import { collection, getDocs, setDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

const getLists = async () => {
  const querySnapShot = await getDocs(collection(db, 'lists'))
  const fetchData = querySnapShot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
  return fetchData
}

const addList = async ({ newList, id }) => {
  const newLists = await setDoc(doc(db, 'lists', id), newList)
  return newLists
}

const deleteList = async (targetId) => {
  await deleteDoc(doc(db, 'lists', targetId))
}

const updateList = async ({ targetId, editedList }) => {
  await updateDoc(doc(db, 'lists', targetId), editedPost)
}

export { getLists, addList, deleteList, updateList }
