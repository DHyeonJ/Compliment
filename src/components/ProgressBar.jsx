import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

// 프로그레스 바 스타일을 위한 CSS 파일
import { styled } from 'styled-components'

import { auth } from '../firebase'
import { getProgressData } from '../api/progressApi'

const ProgressBar = () => {
  const user = auth.currentUser
  const { data: mission } = useQuery('mission', getProgressData)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (user) {
      getProgressData(user.uid)
        .then((doneMissionCount) => {
          const calculatedProgress = (doneMissionCount / 4) * 100
          queryClient.setQueryData('mission', calculatedProgress)
          queryClient.invalidateQueries('mission')
        })
        .catch((error) => {
          console.error('Error fetching doneMission count:', error)
        })
    }
  }, [user, queryClient])

  return (
    <>
      <TextBox>
        <RateTitleBox>미션 달성률</RateTitleBox>
      </TextBox>
      <ProgressInfoBox>
        <ProgressBox>
          <ProgressColorBox percentage={mission} />
        </ProgressBox>
      </ProgressInfoBox>
      <ProgressPercentInfoBox>
        <ProgressPercent>{mission}%</ProgressPercent>
      </ProgressPercentInfoBox>
    </>
  )
}

export default ProgressBar

const TextBox = styled.div`
  display: flex;
  align-items: left;
  align-self: stretch;
  gap: 8px;

  width: 100%;

  padding: 0px 40px;

  background: var(--white, #fff);

  border-radius: 8px;
`
const RateTitleBox = styled.div`
  color: #404040;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 17.6px */
`
const ProgressInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 64px;
  align-self: stretch;

  padding: 12px 24px;
`
const ProgressBox = styled.div`
  display: flex;
  flex-shrink: 0;
  align-self: stretch;
  align-items: flex-start;

  width: 100%;

  padding: 8px;

  border-radius: 20px;
  border: 1px solid lightgrey;
`
const ProgressColorBox = styled.div`
  flex-shrink: 0;

  width: ${(props) => props.percentage}%;
  height: 16px;

  background: #f6b000;

  border-radius: 20px;
`

const ProgressPercentInfoBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  height: 20px;

  margin: 0 auto;
`

const ProgressPercent = styled.div`
  color: #404040;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 19.8px */
`
