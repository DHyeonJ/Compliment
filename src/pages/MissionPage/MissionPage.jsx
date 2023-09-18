import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { styled } from 'styled-components'

import MenuNav from '../../components/MenuNav'
import Loading from '../../components/Loading'

import { getMissionCards, updateMissionCard, getMyMissionCard } from '../../api/missionCardsApi'

import missionCard from '../../img/missionCard.png'
import missionCardActive from '../../img/missionCardActive.png'
import MissionProgressBar from '../../components/MissionProgressBar'

import { auth } from '../../firebase'

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
      <HugBox>
        <BannerBox>
          <BannerContainerBox>
            <BannerTitleBox>미션 도착!</BannerTitleBox>
            <BannerContentBox>
              매일 칭찬 미션이 도착합니다. <br /> 수행하면서, 칭찬에 대한 영감을 얻고 긍정의 에너지를 나눠보세요.
              <br /> 오늘 하루 미션 성공에 도전해보세요! <br /> 미션 달성률은 마이페이지에서도 확인하실 수 있습니다.
            </BannerContentBox>
          </BannerContainerBox>
        </BannerBox>
        <RateBox>
          <MissionProgressBar completedMissionCards={myMissionCards.data.cards.filter((card) => card.checked)} totalMissionCards={myMissionCards.data.cards.length} />
        </RateBox>
        <MissionCardAllBox>
          <DailyMissionAllBox>
            <DailyMissionBox>
              오늘의 미션! <p>미션 수행 후, 카드를 클릭하면 미션 제출이 됩니다.</p>
            </DailyMissionBox>
          </DailyMissionAllBox>
          <MissionCardsBox>
            {myMissionCards.data.cards?.map((item) => {
              const [cardData] = missionData.filter((mission) => mission.id === item.id)
              return (
                <MissionCardBox key={item.id} onClick={async () => await handleCardClick(item.id)} isSelected={item.checked}>
                  <MissionCardFrameBox isSelected={item.checked}>
                    <MissionCardTitleBox isSelected={item.checked}>{cardData.title}</MissionCardTitleBox>
                    <LogoBox isSelected={item.checked}>
                      <picture>
                        <LogoImg src={item.checked ? missionCardActive : missionCard} alt={item.checked ? 'Active Mission Card' : 'Inactive Mission Card'} />
                      </picture>
                    </LogoBox>
                    <MissionCardContentsBox isSelected={item.checked}>{cardData.content}</MissionCardContentsBox>
                  </MissionCardFrameBox>
                </MissionCardBox>
              )
            })}
          </MissionCardsBox>
        </MissionCardAllBox>
      </HugBox>
    </>
  )
}

export default MissionPage

const HugBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 48px;

  width: 1200px;

  margin: 0 auto;
  padding-top: 16px;

  box-sizing: border-box;
`

const BannerBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;

  width: 100%;

  padding: 48px 56px;

  background: #fcfbe6;

  border-radius: 20px;
  box-sizing: border-box;
`

const BannerContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`

const BannerTitleBox = styled.div`
  color: #404040;
  font-family: LINE Seed Sans KR;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const BannerContentBox = styled.div`
  color: #404040;
  font-family: LINE Seed Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
`

const RateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;

  width: 100%;

  padding: 0 0 0 50px;

  box-sizing: border-box;
`

const MissionCardAllBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  box-sizing: border-box;
  border-radius: 12px;
  margin-bottom: 20px;
`

const DailyMissionAllBox = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;

  height: 48px;

  padding: 0px 0px 0px 50px;
`

const DailyMissionBox = styled.div`
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

const MissionCardsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: stretch;
  align-items: center;
  gap: 27px;

  width: 100%;

  padding: 0px 64px;

  box-sizing: border-box;
`

const MissionCardBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  width: 236px;
  height: 368px;

  padding: 8px;

  background: ${(props) => (props.isSelected ? ' #AD7D83' : '#fefbf3')};

  border-radius: 20px;
  border: 2px solid #f5f1e6;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);

  cursor: pointer;
`

const MissionCardFrameBox = styled.div`
  display: flex;
  flex: 1 0 0;
  align-self: stretch;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  border-radius: 16px;
  border: ${(props) => (props.isSelected ? '2px solid #F5F1E6' : '2px solid #c5b2bc')};
`
const MissionCardTitleBox = styled.div`
  margin: 0px auto;

  color: ${(props) => (props.isSelected ? '#FEFBF3' : '#69535F')};
  text-align: center;
  font-family: LINE Seed Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 32px */
`

const LogoBox = styled.div`
  padding: 18px;
`
const LogoImg = styled.img`
  height: 78px;
`

const MissionCardContentsBox = styled.div`
  margin: 0px auto;

  color: ${(props) => (props.isSelected ? '#FEFBF3' : '#69535F')};
  text-align: center;
  font-family: LINE Seed Sans KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 148%; /* 20.72px */
`
