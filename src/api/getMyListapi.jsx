import { collection, getDocs, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase'

const GetMyListapi = async () => {
  const user = auth.currentUser
  const uid = user.uid

  const docRef = doc(db, 'mission', uid)

  try {
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const myLists = docSnap.data()
      return myLists
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export { GetMyListapi }
