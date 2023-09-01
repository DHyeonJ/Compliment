import React, { useState, useEffect } from 'react'
// 프로그레스 바 스타일을 위한 CSS 파일
import { styled } from 'styled-components'
import { auth, db } from '../firebase'
import { doc } from 'firebase/firestore'
import { useQuery } from 'react-query'
import { getProgressData } from '../api/progressApi'

const ProgressBar = () => {
  const user = auth.currentUser
  //
  const docRef = doc(db, 'mission', user.uid)
  console.log('yaMission', docRef.doneMission)
  const [progress, setProgress] = useState(0)
  console.log(user.uid)

  useEffect(() => {
    if (user.uid) {
      const userMission = setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress * 25))
    }

    return () => {
      // clearInterval(userMission)
    }
  }, [])

  return (
    <ProgressBox className="progress-bar-container">
      <Progress className="progress-bar" style={{ width: `${progress}%` }}></Progress>
    </ProgressBox>
  )
}

export default ProgressBar

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
const Progress = styled.div`
  width: 446px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 20px 0px 0px 20px;
  background: #f6b000;
`
