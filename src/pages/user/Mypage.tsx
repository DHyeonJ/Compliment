import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

function Mypage() {
  const navigator = useNavigate()

  const [highlightedButton, setHighlightedButton] = useState('detail')

  const EditUserpageMove = () => {
    navigator('/EditUserInfo')
  }

  return (
    <>
      <div>
        <MypageBox>
          <ProfileBox>
            <ProfileImage alt="프로필 이미지" />
            <TextBox>
              <NicknameTextBox>
                OOO 님 <br />
                안녕하세요.
              </NicknameTextBox>
              <SignEditBox onClick={EditUserpageMove}>회원정보 수정</SignEditBox>
            </TextBox>
          </ProfileBox>
          <RateBox>
            <RateTitle>달성률</RateTitle>
            <GaugeContainer>
              <GaugeFill percentage={75} />
            </GaugeContainer>
          </RateBox>
          <ListBox>
            <DetailListBox className={highlightedButton === 'detail' ? 'highlighted' : ''} onClick={() => setHighlightedButton('detail')}>
              나의 칭구들
            </DetailListBox>
            <CommentListBox className={highlightedButton === 'comment' ? 'highlighted' : ''} onClick={() => setHighlightedButton('comment')}>
              내가 작성한 댓글
            </CommentListBox>
          </ListBox>
        </MypageBox>
      </div>
    </>
  )
}

export default Mypage

const MypageBox = styled.div`
  display: flex;
  height: 100vh;
  margin-top: 84px;
  flex-direction: column;
  align-items: center;
`

const ProfileBox = styled.div`
  display: flex;
  width: 784px;
  height: 150px;
  padding: 0px 24px;
  justify-content: center;
  align-items: flex-start;
  gap: 64px;
  flex-shrink: 0;
`

const ProfileImage = styled.img`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid black;
  gap: 16px;
`

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
`

const NicknameTextBox = styled.div`
  color: #404040;
  font-family: LINE Seed Sans KR;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const SignEditBox = styled.div`
  color: #666;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 14px;
`

const RateBox = styled.div`
  display: flex;
  width: 688px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 36px;
`

const RateTitle = styled.div`
  color: #333;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`

const GaugeContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
`

const GaugeFill = styled.div<{ percentage: number }>`
  width: ${(props) => props.percentage}%;
  height: 100%;
  background-color: #4caf50;
  border-radius: 10px;
`

const ListBox = styled.div`
  display: flex;
  width: 864px;
  padding: 0px 88px;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
  margin-top: 48px;
`

const DetailListBox = styled.button`
  display: flex;
  height: 56px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  color: #404040;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  border: none;
  outline: none;
  background-color: white;
  cursor: pointer;

  &.highlighted {
    /* text-decoration: underline; */
    border-bottom: 2px solid black;
    /* background-color: #f0f0f0; */
  }

  &:hover {
    /* text-decoration: underline; */
    /* background-color: #f0f0f0; */
  }
`

const CommentListBox = styled.button`
  display: flex;
  height: 56px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  color: #404040;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  border: none;
  outline: none;
  background-color: white;
  cursor: pointer;

  &.highlighted {
    /* text-decoration: underline; */
    border-bottom: 2px solid black;
    /* background-color: #f0f0f0; */
  }

  &:hover {
    /* text-decoration: underline; */
    /* background-color: #f0f0f0; */
  }
`
