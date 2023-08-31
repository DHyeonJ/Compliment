/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Logo from '../../components/Logo'
import MenuNav from '../../components/MenuNav'
import { getMissionCards, updateMissionCard, setMissionCard } from '../../api/MissionCardsApi'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { auth } from '../../firebase'

const MissionPage = () => {
  const { data: missionData, isLoading } = useQuery('missionContents', getMissionCards)
  const [randomCards, setRandomCards] = useState([]) // 랜덤하게 선택된 미션 카드 상태
  const [selectedCardId, setSelectedCardId] = useState([]) // 클릭한 미션 카드의 ID 상태
  //
  const [prevDate, setPrevDate] = useState(new Date())

  //
  const [doneMission, setDoneMission] = useState(0)

  //
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(updateMissionCard, {
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries('missionContents')
    },
  })

  useEffect(() => {
    const updateMissionCards = async () => {
      const newMissionData = await getMissionCards()
      const newRandomCards = []
      while (newRandomCards.length < 4) {
        const randomIndex = Math.floor(Math.random() * newMissionData.length)
        const randomCard = newMissionData[randomIndex]
        if (!newRandomCards.some((card) => card.id === randomCard.id)) {
          newRandomCards.push(randomCard)
        }
      }
      setRandomCards(newRandomCards)
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateMissionCards()

    // 매일 자정마다 상태 초기화
    const resetSelectedCards = async () => {
      setSelectedCardId([])
      const newMissionData = await getMissionCards()
      const newRandomCards = []
      while (newRandomCards.length < 4) {
        const randomIndex = Math.floor(Math.random() * newMissionData.length)
        const randomCard = newMissionData[randomIndex]
        if (!newRandomCards.some((card) => card.id === randomCard.id)) {
          newRandomCards.push(randomCard)
        }
      }
      setRandomCards(newRandomCards)
    }

    const now = new Date()
    // const timeUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now
    // const resetInterval = setInterval(resetSelectedCards, timeUntilMidnight)
    const resetInterval = setInterval(resetSelectedCards, 1000000000)

    // Cleanup function to clear the interval
    return () => clearInterval(resetInterval)
  }, [])

  const handleCardClick = async (cardId) => {
    const userInfo = auth.currentUser
    let resultCount

    if (selectedCardId.includes(cardId)) {
      resultCount = selectedCardId.length - 1
      setSelectedCardId(selectedCardId.filter((id) => id !== cardId))
      setDoneMission(selectedCardId.length - 1) // 선택한 카드 수 감소
    } else {
      resultCount = selectedCardId.length + 1
      setSelectedCardId([...selectedCardId, cardId])
      setDoneMission(selectedCardId.length + 1) // 선택한 카드 수 증가
    }
    // setter 뒤에 update된 state는 쓰면 안됨

    // 결과값 바로 전달
    try {
      await mutateAsync({ targetId: userInfo.uid, editedMissionCard: resultCount })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <MenuNav />
      <Hug>
        <BannerBox>
          <BannerContainer>
            <BannerTitle>미션 도착!</BannerTitle>
            <BannerContent>
              매일 칭찬 미션이 도착합니다. <br /> 수행하면서, 칭찬에 대한 영감을 얻고 긍정의 에너지를 나눠보세요.
            </BannerContent>
          </BannerContainer>
        </BannerBox>
        <MissionCardBox>
          <DailyMissionBox>
            <DailyMission>오늘의 미션!</DailyMission>
          </DailyMissionBox>
          <MissionCards>
            {randomCards?.map((item) => {
              return (
                <MissionCard key={item.id} onClick={async () => await handleCardClick(item.id)} isSelected={selectedCardId.includes(item.id)}>
                  <MissionCardFrame>
                    <MissionCardTitle>{item.title}</MissionCardTitle>
                    <LogoBox>
                      <Logo></Logo>
                    </LogoBox>
                    <MissionCardContents>{item.content}</MissionCardContents>
                  </MissionCardFrame>
                </MissionCard>
              )
            })}
          </MissionCards>
        </MissionCardBox>
      </Hug>
    </div>
  )
}

export default MissionPage

const LogoBox = styled.div`
  /* width: 111px;
height: 78px; */
  padding: 18px;
`

const MissionCardContents = styled.div`
  color: #69535f;
  text-align: center;
  font-family: LINE Seed Sans KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 148%; /* 20.72px */
  margin: 0px 47px 50px 47px;
`

const MissionCardTitle = styled.div`
  color: #69535f;
  text-align: center;
  font-family: LINE Seed Sans KR;
  font-size: 20px;
  font-style: normal;

  font-weight: 700;
  line-height: 160%; /* 32px */
  margin: 51px 65px 0px 51px;
`
const MissionCardFrame = styled.div`
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 16px;
  border: 2px solid #c5b2bc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const MissionCard = styled.div`
  display: flex;
  width: 256px;
  height: 368px;
  padding: 8px;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 20px;
  border: 2px solid #f5f1e6;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  /* background: #fefbf3; */
  background: ${(props) => (props.isSelected ? 'green' : '#fefbf3')};
`

const MissionCards = styled.div`
  display: flex;
  padding: 0px 64px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`

const DailyMission = styled.div`
  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
`

const DailyMissionBox = styled.div`
  display: flex;
  height: 48px;
  padding: 0px 64px;
  align-items: flex-start;
  gap: 56px;
  align-self: stretch;
`

const MissionCardBox = styled.div`
  display: flex;
  padding-bottom: 0px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border: 1px solid red;
`

const BannerContent = styled.div`
  color: #404040;
  font-family: LINE Seed Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
`

const BannerTitle = styled.div`
  color: #404040;
  font-family: LINE Seed Sans KR;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const BannerContainer = styled.div`
  display: flex;
  width: 1328px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border: 1px solid green;
`

const Hug = styled.div`
  display: flex;
  padding: 16px 240px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border: 2px solid green;
`
const BannerBox = styled.div`
  display: flex;
  width: 1440px;
  padding: 48px 56px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  background: #fcfbe6;
`
