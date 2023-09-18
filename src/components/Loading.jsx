import React from 'react'

import { styled } from 'styled-components'

import LoadingImg from '../img/loading animation.gif'

function Loading() {
  return (
    <LoadingPageBox>
      <LoadingTextBox>
        <LoadingTitleBox>잠시만 기다려주시겠어요?</LoadingTitleBox>
        <LoadingContentBox>
          서비스 화면을 불러오고 있어요.
          <br />
          잠시 기다리시는 동안, 나와 주변인들에 대한 칭찬과 격려의 말을 떠올려보시는 건 어떨꺼요?
          <br />
          오늘 하루, 어제 보다 나아진 내 모습은? 나 스스로에게, 또는 주변 사람들에게 칭찬 해 줄 만한 일들이 있었나요?
        </LoadingContentBox>
      </LoadingTextBox>
      <LoadingImgBox>
        <LoadingImage src={LoadingImg} alt="로딩 중" />
      </LoadingImgBox>
    </LoadingPageBox>
  )
}

export default Loading

const LoadingPageBox = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 59.5vh;
`

const LoadingTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  align-self: stretch;

  padding: 48px 72px 48px 46px;

  margin-left: 300px;
`

const LoadingTitleBox = styled.div`
  font-size: 48px;
  font-style: normal;
`

const LoadingContentBox = styled.div`
  margin-top: 32px;

  font-size: 20px;
  font-style: normal;
`

const LoadingImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LoadingImage = styled.img`
  width: 15%;
  height: 15%;
`
