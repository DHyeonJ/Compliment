import { collection, getDocs, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase'

const GetMyListapi = async () => {
  const user = auth.currentUser // 현재 사용자를 가져옵니다.
  const uid = user.uid // 현재 사용자의 UID를 가져옵니다.

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
    throw error // 에러를 다시 던질 수 있습니다.
  }
}

export { GetMyListapi }
