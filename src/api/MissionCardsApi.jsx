import { collection, getDocs, setDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

const getMissionCards = async () => {
  const querySnapShot = await getDocs(collection(db, 'missionContents'))
  // console.log(querySnapShot)
  const fetchedData = querySnapShot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))

  return fetchedData
}

const addMissionCard = async ({ newMissionCard, id }) => {
  const addedMissionCard = await setDoc(doc(db, 'missionContents', id), newMissionCard)
  return addedMissionCard
}

const deleteMissionCard = async (targetId) => {
  await deleteDoc(doc(db, 'mission', targetId))
}

const updateMissionCard = async ({ targetId, editedMissionCard }) => {
  await updateDoc(doc(db, 'mission', targetId), editedMissionCard)
}

export { getMissionCards, addMissionCard, deleteMissionCard, updateMissionCard }
