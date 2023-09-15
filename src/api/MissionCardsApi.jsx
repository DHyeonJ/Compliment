import { collection, getDocs, setDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import getDate from '../utils/date'

const getMissionCards = async () => {
  try {
    const querySnapShot = await getDocs(collection(db, 'missionContents'))
    // console.log(querySnapShot)
    const fetchedData = querySnapShot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))

    return fetchedData
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error // 에러를 다시 던질 수 있습니다.
  }
}

// 회원가입 시에 set해줌!!!

const addMissionCard = async ({ newMissionCard, id }) => {
  try {
    const addedMissionCard = await setDoc(doc(db, 'missionContents', id), newMissionCard)
    return addedMissionCard
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error // 에러를 다시 던질 수 있습니다.
  }
}

//

const setMissionCard = async (id) => {
  try {
    const setMission = await setDoc(doc(db, 'mission', id), {})
    return setMission
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error // 에러를 다시 던질 수 있습니다.
  }
}

const deleteMissionCard = async (targetId) => {
  try {
    await deleteDoc(doc(db, 'mission', targetId))
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error // 에러를 다시 던질 수 있습니다.
  }
}

const getRandomCards = (newMissionData) => {
  try {
    const newRandomCards = []
    while (newRandomCards.length < 4) {
      const randomIndex = Math.floor(Math.random() * newMissionData.length)
      const randomCard = newMissionData[randomIndex]
      if (!newRandomCards.some((card) => card.id === randomCard.id)) {
        newRandomCards.push(randomCard)
      }
    }
    return newRandomCards
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error // 에러를 다시 던질 수 있습니다.
  }
}

const getMyMissionCard = async () => {
  try {
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
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error // 에러를 다시 던질 수 있습니다.
  }
}

const firstMissionCard = async ({ targetId, newMissionCards }) => {
  try {
    const cards = newMissionCards.map((card) => ({ id: card.id, checked: false }))
    const newState = { cards, date: getDate() }
    await updateDoc(doc(db, 'mission', targetId), newState)
    return newState
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error // 에러를 다시 던질 수 있습니다.
  }
}

const updateMissionCard = async ({ targetId, editedMissionCards }) => {
  try {
    await updateDoc(doc(db, 'mission', targetId), {
      cards: editedMissionCards,
    })
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error // 에러를 다시 던질 수 있습니다.
  }
}

export { getMissionCards, addMissionCard, deleteMissionCard, updateMissionCard, setMissionCard, firstMissionCard, getMyMissionCard }
