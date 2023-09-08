import { collection, getDocs, setDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import getDate from '../utils/date'

const getMissionCards = async () => {
  const querySnapShot = await getDocs(collection(db, 'missionContents'))
  // console.log(querySnapShot)
  const fetchedData = querySnapShot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))

  return fetchedData
}

// 회원가입 시에 set해줌!!!

const addMissionCard = async ({ newMissionCard, id }) => {
  const addedMissionCard = await setDoc(doc(db, 'missionContents', id), newMissionCard)
  return addedMissionCard
}

//

const setMissionCard = async (id) => {
  const setMission = await setDoc(doc(db, 'mission', id), {})
  return setMission
}

const deleteMissionCard = async (targetId) => {
  await deleteDoc(doc(db, 'mission', targetId))
}

const getRandomCards = (newMissionData) => {
  const newRandomCards = []
  while (newRandomCards.length < 4) {
    const randomIndex = Math.floor(Math.random() * newMissionData.length)
    const randomCard = newMissionData[randomIndex]
    if (!newRandomCards.some((card) => card.id === randomCard.id)) {
      newRandomCards.push(randomCard)
    }
  }
  return newRandomCards
}

const getMyMissionCard = async () => {
  const user = auth.currentUser
  if (!user) throw new Error('유저가 없습니다')
  const docRef = doc(db, 'mission', user.uid)
  const docSnap = await getDoc(docRef)
  // docSnap.exists()
  if (!docSnap.exists()) {
    await setMissionCard(user.uid)
    const missions = await getMissionCards()
    const randomCards = getRandomCards(missions)
    return await firstMissionCard({ targetId: user.uid, newMissionCards: randomCards })
  } else {
    const myMissionCards = docSnap.data()
    // eslint-disable-next-line new-cap
    if (myMissionCards.date !== getDate()) {
      // 새로넣어줘야
      const missions = await getMissionCards()
      const randomCards = getRandomCards(missions)
      return await firstMissionCard({ targetId: user.uid, newMissionCards: randomCards })
    } else {
      // 그냥 반환
      return myMissionCards
    }
  }
}

const firstMissionCard = async ({ targetId, newMissionCards }) => {
  const cards = newMissionCards.map((card) => ({ id: card.id, checked: false }))
  const newState = { cards, date: getDate() }
  await updateDoc(doc(db, 'mission', targetId), newState)
  return newState
}

const updateMissionCard = async ({ targetId, editedMissionCards }) => {
  console.log('check', targetId, editedMissionCards)
  await updateDoc(doc(db, 'mission', targetId), {
    cards: editedMissionCards,
  })
}

export { getMissionCards, addMissionCard, deleteMissionCard, updateMissionCard, setMissionCard, firstMissionCard, getMyMissionCard }
