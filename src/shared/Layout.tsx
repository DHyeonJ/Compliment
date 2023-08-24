import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons'

function Layout(): JSX.Element {
  const openGitHub = (): void => {
    window.open('https://github.com/NB-Last-PJ/Compliment', '_blank')
  }
  return (
    <>
      <HeaderBox>
        <LogoTitleBox>
          <LogoBox>logo</LogoBox>
          <TitleSpan>칭찬을 구해요, 칭구</TitleSpan>
        </LogoTitleBox>
        <ButtonsBox>
          <LoginButton>로그인</LoginButton>
          <SignUpButton>회원가입</SignUpButton>
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
          <GitHubIcon icon={faSquareGithub} onClick={openGitHub} />
        </ContentBox>
      </FooterBox>
    </>
  )
}

export default Layout

const HeaderBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;

  width: 100vw;
  height: 5rem;
`
const LogoTitleBox = styled.div`
  display: flex;
  gap: 10px;

  width: calc(100% / 3);
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
  font-weight: bold;
  color: #404040;
  font-size: 20px;
`

const ButtonsBox = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 10px;

  width: calc(100% / 3);

  margin-right: 10px;
`

const LoginButton = styled.button`
  width: 6.125rem;
  height: 2.75rem;

  background-color: #6a6a6a;

  border: none;
  border-radius: 8px;

  color: #ffffff;
  font-size: 16px;

  cursor: pointer;
`
const SignUpButton = styled.button`
  width: 6.125rem;
  height: 2.75rem;

  background-color: #ffffff;

  border: 1px solid #666666;
  border-radius: 8px;

  color: #666666;
  font-size: 16px;

  cursor: pointer;
`
const FooterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f5f5f5;

  width: 100vw;
  height: 19.25rem;
`

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 140px;
`
const FooterLogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 4rem;
  height: 3rem;

  background-color: #d0d0d0;

  color: #999999;

  margin-bottom: 12px;
`
const FooterTitleBox = styled.div`
  display: flex;
  justify-content: center;

  color: #999999;

  margin-bottom: 12px;
`

const InfoBox = styled.div`
  width: 17.5rem;
  height: 2.75rem;

  font-size: 14px;
`

const MakeTeamBox = styled.div`
  color: #999999;
`

const GitHubIcon = styled(FontAwesomeIcon)`
  margin-top: 12px;
  width: 1.5rem;
  height: 1.5rem;

  cursor: pointer;
`
