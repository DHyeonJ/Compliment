import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

const getProgressData = async (id) => {
  const docRef = doc(db, 'mission', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    // eslint-disable-next-line array-callback-return
    const checkedData = data.cards.filter((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return item.checked === true
    })
    console.log('ddd', checkedData)
    return checkedData.length || 0
  }
  return 0 // 스냅샷 데이터 반환
}

export { getProgressData }
