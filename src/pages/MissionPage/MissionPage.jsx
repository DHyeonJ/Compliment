/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react'
import { auth, firestore } from '../../firebase'
import { styled } from 'styled-components'
import { getMissionCards } from '../../api/MissionCardsApi'
import { useQuery } from 'react-query'

function MissionPage() {
  const user = auth.currentUser
  const loggedInUserEmail = user ? user.email : null

  const [selectedValues, setSelectedValues] = useState([])
  const [missions, setMissions] = useState([])

  const handleCheckboxChange = (event) => {
    const value = event.target.value
    if (event.target.checked) {
      setSelectedValues([...selectedValues, value])
    } else {
      setSelectedValues(selectedValues.filter((item) => item !== value))
    }
  }

  const handleGetCheckboxValue = () => {
    const result = selectedValues.join(', ') // 선택된 값들을 쉼표와 공백으로 연결
    alert(result) // 선택된 값들을 알림으로 보기
    setSelectedValues([]) // 선택된 값들을 초기화하여 unchecked 상태로 변경-> 불가 툴킷으로 구현하기
  }

  const [missionCardData, setMissionCardData] = useState([])
  const { data: missionCard, isLoading } = useQuery('missionCards', getMissionCards)
  console.log(missionCard)
  const a = () => {
    const missionCardDatas = [...missionCard]
    setMissionCardData(missionCardDatas)
  }
  // 미션 카드 불러오기
  const [missionCards, setMissionCards] = useState([])
  console.log(missionCards)
  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const fetchedMissionCards = await getMissionCards()
    //     setMissionCards(fetchedMissionCards)
    //   } catch (error) {
    //     console.error('Error fetching mission cards:', error)
    //   }
    // }
    // fetchData()
    if (missionCard) {
      a()
    }
  }, [missionCard])

  if (isLoading) {
    return <div>is Loading...</div>
  }

  return (
    <>
      <div>MissionPage</div>
      <MissionTextAreaBox>
        <MissionTitleBox>미션도착!</MissionTitleBox>
        <MissionTextBox>매일 칭찬 미션이 도착합니다. 미션을 수행하면서, 칭찬에 대한 영감을 얻고 긍정의 에너지를 나눠보세요.</MissionTextBox>
      </MissionTextAreaBox>

      <div>
        미션 카드 박스 영역
        <div>
          <label>
            <input type="checkbox" name="mission" value="mission1" onChange={handleCheckboxChange} />
            미션1
          </label>
          <label>
            <input type="checkbox" name="mission" value="mission2" onChange={handleCheckboxChange} />
            미션2
          </label>
          <label>
            <input type="checkbox" name="mission" value="mission3" onChange={handleCheckboxChange} />
            미션3
          </label>
          <label>
            <input type="checkbox" name="mission" value="mission4" onChange={handleCheckboxChange} />
            미션4
          </label>
          <button onClick={handleGetCheckboxValue}>제출하기</button>
        </div>
      </div>

      {missionCard.map((card) => {
        const [mission, status] = Object.entries(card)[0]
        return (
          <div key={card.id}>
            <p>
              {mission}: {status.toString()}
            </p>
          </div>
        )
      })}
    </>
  )
}

export default MissionPage

const MissionTextAreaBox = styled.div`
  width: 1440px;
  height: 240px;
  padding: 48px 72px 48px 46px;
  align-items: center;
  align-self: stretch;
  border-radius: 20px;
  background: #fffaec;
  color: #000000;
  margin-left: 240px;
  margin-right: 240px;
  margin-top: 16px;
  margin-bottom: 48px;
  padding: 48px 75px 48px 46px;
`
const MissionTitleBox = styled.div`
  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 16px;
`
const MissionTextBox = styled.div`
  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 160% */
`
