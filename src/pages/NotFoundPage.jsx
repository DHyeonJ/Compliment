import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo_NotFound from '../img/logo_NotFound.png'
import { styled } from 'styled-components'
function NotFoundPage() {
  const navigator = useNavigate()
  const mainPageMove = () => {
    navigator('/')
  }
  return (
    <>
      <NotFoundBox>
        <NotFoundTextAreaBox>
          <NotFoundTitleBox> 죄송합니다, 원하시는 페이지를 찾을 수 없어요</NotFoundTitleBox>
          <NotFoundTextBox>
            찾으시는 페이지가 없거나, 정보 변경 등의 이유로 오류가 발생했습니다.
            <br></br>입력하신 주소나 해당하는 링크가 정확한 지 다시 한번만 확인해 주세요.
            <br></br> 빠른 시일 내에 원인을 파악하여 더 나은 경험을 하실 수 있게 개선하겠습니다. :D
          </NotFoundTextBox>
          <div>
            <NotFoundImg onClick={mainPageMove} src={logo_NotFound}></NotFoundImg>
          </div>
        </NotFoundTextAreaBox>
      </NotFoundBox>
    </>
  )
}

export default NotFoundPage

const NotFoundBox = styled.div`
  display: flex;
  height: 918px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`
const NotFoundTextAreaBox = styled.div`
  height: 240px;
  padding: 48px 72px 48px 46px;
  align-items: center;
  align-self: stretch;
  margin-left: auto;
  margin-right: auto;
`
const NotFoundTitleBox = styled.div`
  color: #404040;
  font-family: LINE Seed Sans KR;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const NotFoundTextBox = styled.div`
  color: #404040;
  font-family: LINE Seed Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 160% */
  margin-top: 16px;
`
const NotFoundImgBox = styled.div`
  cursor: pointer;
`
const NotFoundImg = styled.img`
  width: 288px;
  height: 200.325px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
`
