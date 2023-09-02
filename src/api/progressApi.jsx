import { collection, getDocs, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

const getProgressData = async (id) => {
  const docRef = doc(db, 'mission', id)
  console.log('data', docRef)
  const docSnap = await getDoc(docRef)
  console.log('data', docSnap)

  if (docSnap.exists()) {
    const data = docSnap.data()
    return data.doneMission || 0
  }
  return 0 // 스냅샷 데이터 반환
}

export { getProgressData }
