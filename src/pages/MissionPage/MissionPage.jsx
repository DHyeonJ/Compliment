import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import MenuNav from '../../components/MenuNav'
import { getMissionCards, updateMissionCard, getMyMissionCard } from '../../api/MissionCardsApi'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { auth } from '../../firebase'
import missionCard from '../../img/missionCard.png'
import missionCardActive from '../../img/missionCardActive.png'
import Loading from '../../components/Loading'
import MissionProgressBar from '../../components/MissionProgressBar'

const MissionPage = () => {
  const user = auth.currentUser
  const { data: missionData, isLoading } = useQuery('missionContents', getMissionCards)

  const myMissionCards = useQuery('myMissionCard', getMyMissionCard)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(updateMissionCard, {
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries('myMissionCard')
    },
  })

  const handleCardClick = async (cardId) => {
    const userInfo = auth.currentUser

    const newMissionCards = myMissionCards.data.cards.map((card) => {
      if (card.id === cardId) return { ...card, checked: !card.checked }
      return card
    })

    try {
      await mutateAsync({ targetId: userInfo.uid, editedMissionCards: newMissionCards })
    } catch (e) {
      console.log(e)
    }
  }
  if (isLoading || myMissionCards.isLoading) {
    return <Loading />
  }

  return (
    <>
      <MenuNav />
      <Hug>
        <BannerBox>
          <BannerContainer>
            <BannerTitle>미션 도착!</BannerTitle>
            <BannerContent>
              매일 칭찬 미션이 도착합니다. <br /> 수행하면서, 칭찬에 대한 영감을 얻고 긍정의 에너지를 나눠보세요.
              <br /> 오늘 하루 미션 성공에 도전해보세요! <br /> 미션 달성률은 마이페이지에서도 확인하실 수 있습니다.
            </BannerContent>
          </BannerContainer>
        </BannerBox>
        <RateBox>
          <MissionProgressBar completedMissionCards={myMissionCards.data.cards.filter((card) => card.checked)} totalMissionCards={myMissionCards.data.cards.length} />
        </RateBox>
        <MissionCardBox>
          <DailyMissionBox>
            <DailyMission>
              오늘의 미션! <p>미션 수행 후, 카드를 클릭하면 미션 제출이 됩니다.</p>
            </DailyMission>
          </DailyMissionBox>
          <MissionCards>
            {myMissionCards.data.cards?.map((item) => {
              const [cardData] = missionData.filter((mission) => mission.id === item.id)
              return (
                <MissionCard key={item.id} onClick={async () => await handleCardClick(item.id)} isSelected={item.checked}>
                  <MissionCardFrame isSelected={item.checked}>
                    <MissionCardTitle isSelected={item.checked}>{cardData.title}</MissionCardTitle>
                    <LogoBox isSelected={item.checked}>
                      <LogoImg src={item.checked ? missionCardActive : missionCard} alt={item.checked ? 'Active Mission Card' : 'Inactive Mission Card'} />
                    </LogoBox>
                    <MissionCardContents isSelected={item.checked}>{cardData.content}</MissionCardContents>
                  </MissionCardFrame>
                </MissionCard>
              )
            })}
          </MissionCards>
        </MissionCardBox>
      </Hug>
    </>
  )
}

export default MissionPage

const Hug = styled.div`
  display: flex;
  padding: 16px 240px 48px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  box-sizing: border-box;
  margin: 0 auto;
`

const BannerBox = styled.div`
  display: flex;
  padding: 48px 56px;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  box-sizing: border-box;
  background: #fcfbe6;
`
const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`

const BannerTitle = styled.div`
  color: #404040;

  font-family: LINE Seed Sans KR;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const BannerContent = styled.div`
  color: #404040;
  font-family: LINE Seed Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
`
const RateBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
  padding: 0 0 0 50px;
  box-sizing: border-box;
`
const MissionCardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  box-sizing: border-box;
`
const DailyMissionBox = styled.div`
  display: flex;
  height: 48px;
  padding: 0px 0px 0px 50px;
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
  p {
    display: inline;
    box-shadow: inset 0 -2px 0 #f6b000;
  }
`
const MissionCards = styled.div`
  display: flex;
  padding: 0px 64px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 64px;
  width: 100%;
  box-sizing: border-box;
`
const MissionCard = styled.div`
  display: flex;
  cursor: pointer;
  width: 236px;
  height: 368px;
  padding: 8px;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 20px;
  border: 2px solid #f5f1e6;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  background: ${(props) => (props.isSelected ? ' #AD7D83' : '#fefbf3')};
`

const MissionCardFrame = styled.div`
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 16px;
  border: ${(props) => (props.isSelected ? '2px solid #F5F1E6' : '2px solid #c5b2bc')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const MissionCardTitle = styled.div`
  color: ${(props) => (props.isSelected ? '#FEFBF3' : '#69535F')};
  text-align: center;
  font-family: LINE Seed Sans KR;
  font-size: 20px;
  font-style: normal;

  font-weight: 700;
  line-height: 160%; /* 32px */
  margin: 0px auto;
`

const LogoBox = styled.div`
  padding: 18px;
`
const LogoImg = styled.img`
  height: 78px;
`

const MissionCardContents = styled.div`
  color: ${(props) => (props.isSelected ? '#FEFBF3' : '#69535F')};
  text-align: center;
  font-family: LINE Seed Sans KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 148%; /* 20.72px */
  margin: 0px auto;
`
