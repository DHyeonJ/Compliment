import React from 'react'
import { useNavigate } from 'react-router-dom'

import { styled } from 'styled-components'

import logo_NotFound from '../img/logo_NotFound.webp'

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
          <NotFoundImg onClick={mainPageMove} src="logo_NotFound" type="image/webp" />
        </NotFoundTextAreaBox>
      </NotFoundBox>
    </>
  )
}

export default NotFoundPage

const NotFoundBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 16px;
`

const NotFoundTextAreaBox = styled.div`
  align-self: stretch;

  padding: 48px 72px 48px 46px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 320px) {
    // 0px ~320px
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    // 321px ~ 720px
    margin: 0 auto;
  }
`

const NotFoundTitleBox = styled.div`
  color: #404040;
  font-family: LINESeedSansKR;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const NotFoundTextBox = styled.div`
  margin-top: 16px;

  color: #404040;
  font-family: LINESeedSansKR;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 160% */
`

const NotFoundImg = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 200px;

  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 320px) {
    // 0px ~320px
    width: 100%; /* Example adjustment to make the image responsive */
  }
  @media (max-width: 768px) {
    // 321px ~ 720px
    width: 100%; /* Example adjustment to make the image responsive */
  }
`
