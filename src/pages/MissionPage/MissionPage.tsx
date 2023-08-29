import React from 'react'
import { auth } from '../../firebase'
import { styled } from 'styled-components'

function MissionPage() {
  const user = auth.currentUser
  const loggedInUserEmail = user ? user.email : null

  return (
    <>
      <div>MissionPage</div>
      <MissionTextArea>
        <MissionTitle>미션도착!</MissionTitle>
        <MissionText>매일 칭찬 미션이 도착합니다. 미션을 수행하면서, 칭찬에 대한 영감을 얻고 긍정의 에너지를 나눠보세요.</MissionText>
      </MissionTextArea>
    </>
  )
}

export default MissionPage

const MissionTextArea = styled.div`
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
const MissionTitle = styled.div`
  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 16px;
`
const MissionText = styled.div`
  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 160% */
`
