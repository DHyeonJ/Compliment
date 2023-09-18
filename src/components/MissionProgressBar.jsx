import React from 'react'
import { styled } from 'styled-components'

const MissionProgressBar = ({ completedMissionCards, totalMissionCards }) => {
  const progress = (completedMissionCards.length / totalMissionCards) * 100

  return (
    <>
      <ProgressBoxs>
        <TextBox>
          <RateTitleBox>미션 달성률 ({progress}%)</RateTitleBox>
        </TextBox>
        <ProgressInfoBox>
          <ProgressBox>
            <ProgressColorBox percentage={progress} />
          </ProgressBox>
        </ProgressInfoBox>
      </ProgressBoxs>
    </>
  )
}

export default MissionProgressBar

const ProgressBoxs = styled.div`
  display: flex;
`

const TextBox = styled.div`
  display: flex;
  align-self: stretch;

  background: var(--white, #fff);

  border-radius: 8px;
`
const RateTitleBox = styled.div`
  color: #333333;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: bold;
  line-height: 110%; /* 17.6px */
`
const ProgressInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
`
const ProgressBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
  margin-left: 20px;
  width: 480px;

  border-radius: 20px;
  border: 1px solid #d9d9d9;
`
const ProgressColorBox = styled.div`
  flex-shrink: 0;

  width: ${(props) => props.percentage}%;
  height: 16px;

  background: #d9af88;

  border-radius: 20px;
`
