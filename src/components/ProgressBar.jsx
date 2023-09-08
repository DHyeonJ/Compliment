import React, { useState, useEffect } from 'react'
// 프로그레스 바 스타일을 위한 CSS 파일
import { styled } from 'styled-components'
import { auth } from '../firebase'
import { getProgressData } from '../api/progressApi'
import { useQuery, useQueryClient } from 'react-query'

const ProgressBar = () => {
  const user = auth.currentUser
  // const [progress, setProgress] = useState(0)
  const { data: mission, isLoading } = useQuery('mission', getProgressData)

  const queryClient = useQueryClient()

  // 유저 정보 불러오기 -> 0
  useEffect(() => {
    if (user) {
      // Fetch the doneMission count from Firestore
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
  padding: 0px 40px;
  width: 100%;
  align-items: left;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  background: var(--white, #fff);
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
  padding: 12px 24px;
  justify-content: center;
  align-items: flex-start;
  gap: 64px;
  align-self: stretch;
`
const ProgressBox = styled.div`
  width: 100%;
  display: flex;
  padding: 8px;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid lightgrey;
`
const ProgressColorBox = styled.div`
  width: 446px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #f6b000;
  width: ${(props) => props.percentage}%;
`

const ProgressPercentInfoBox = styled.div`
  display: flex;
  height: 20px;
  margin: 0 auto;
  justify-content: flex-end;
  align-items: center;
`
const ProgressPercent = styled.div`
  color: #404040;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 19.8px */
`
