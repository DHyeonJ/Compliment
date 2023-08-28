import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { auth } from '../firebase.js'

function Layout(): JSX.Element {
  const navigator = useNavigate()

  const openGitHub = (): void => {
    window.open('https://github.com/NB-Last-PJ/Compliment', '_blank')
  }

  const mainPageMove = () => {
    navigator('/')
  }

  const loginPageMove = () => {
    navigator('/login')
  }

  const signUpPageMove = () => {
    navigator('/signup')
  }

  // 현재 로그인된 사용자의 정보를 가져옵니다.

  const user = auth.currentUser
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const loggedinUserEmail = user ? user.email : null

  return (
    <LayOutBox>
      <HeaderBox>
        <LogoTitleBox>
          <div>{loggedinUserEmail}</div>
          <LogoBox onClick={mainPageMove}>logo</LogoBox>
          <TitleSpan>칭찬을 구해요, 칭구</TitleSpan>
        </LogoTitleBox>
        <ButtonsBox>
          <LoginButton onClick={loginPageMove}>로그인</LoginButton>
          <SignUpButton onClick={signUpPageMove}>회원가입</SignUpButton>
        </ButtonsBox>
      </HeaderBox>
      <Outlet />
      <FooterBox>
        <ContentBox>
          <FooterLogoBox>logo</FooterLogoBox>
          <InfoBox>
            <FooterTitleBox>칭구</FooterTitleBox>
            <MakeTeamBox>Copyright 2023. 팀 해보조 all rights reserved.</MakeTeamBox>
          </InfoBox>
          <GitHubIcon icon={faGithub} onClick={openGitHub} />
        </ContentBox>
      </FooterBox>
    </LayOutBox>
  )
}

export default Layout
const LayOutBox = styled.div`
  width: 100vw;
  height: 92.3125rem;
`
const HeaderBox = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  height: 5rem;
  margin: 0 3.5rem;
`
const LogoTitleBox = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100vw;
  align-items: center;
  gap: 0.625rem;
  flex: 1;
`
const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 1.5rem;

  background-color: #d0d0d0;

  cursor: pointer;
`
const TitleSpan = styled.span`
  font-family: 'LINE SEED Sans KR';
  font-weight: bold;
  color: #404040;
  font-size: 1.25rem;
`

const ButtonsBox = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 0.625rem;
`

const LoginButton = styled.button`
  width: 6.125rem;
  height: 2.75rem;

  background-color: #69535f;

  border: none;
  border-radius: 0.5rem;

  color: #ffffff;
  font-size: 1rem;
  font-family: 'pretendard';

  cursor: pointer;
`
const SignUpButton = styled.button`
  width: 6.125rem;
  height: 2.75rem;

  background-color: #ffffff;

  border: 0.0625rem solid #69535f;
  border-radius: 0.5rem;

  color: #69535f;
  font-size: 1rem;
  font-family: 'pretendard';

  cursor: pointer;
`
const FooterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f4f1e9;

  width: 100vw;
  height: 18.5rem;
`

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const FooterLogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 4rem;
  height: 3rem;

  background-color: #d0d0d0;

  color: #999999;

  margin-bottom: 0.75rem;
`
const FooterTitleBox = styled.div`
  display: flex;
  justify-content: center;

  color: #999999;
  font-weight: 500;
  font-family: 'pretendard';
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
`

const InfoBox = styled.div`
  width: 17.5rem;
  height: 2.75rem;

  font-size: 0.875rem;
`

const MakeTeamBox = styled.div`
  color: #999999;
  font-weight: 500;
  font-family: 'pretendard';
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
`

const GitHubIcon = styled(FontAwesomeIcon)`
  margin-top: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  color: #999999;
  cursor: pointer;
`
