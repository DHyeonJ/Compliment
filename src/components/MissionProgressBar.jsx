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
        <RateTitleBox>미션 달성률 {mission}%</RateTitleBox>
      </TextBox>
      <ProgressInfoBox>
        <ProgressBox>
          <ProgressColorBox percentage={mission} />
        </ProgressBox>
      </ProgressInfoBox>
    </>
  )
}

export default ProgressBar
const TextBox = styled.div`
  display: flex;
  align-self: stretch;
  border-radius: 8px;
  background: var(--white, #fff);
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
  gap: 64px;
  align-self: stretch;
`
const ProgressBox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
`
const ProgressColorBox = styled.div`
  height: 16px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #d9af88;
  width: ${(props) => props.percentage}%;
`
