/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useState as ReactUseState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { signOut } from 'firebase/auth'
import { auth, storage } from '../firebase.js'
import logoImg from '../img/logo.png'

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

  const myPageMove = () => {
    navigator('/mypage')
  }
  const [currentUser, setCurrentUser] = ReactUseState<string | null>(null)

  const handleLogout = async () => {
    const confirmLogout = window.confirm('로그아웃하시겠습니까?')
    if (confirmLogout) {
      await signOut(auth)
      setCurrentUser(null)
      navigator('/')
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (user) {
        setCurrentUser(user.email)
      } else {
        setCurrentUser(null)
      }
    })
  }, [])

  return (
    <LayOutBox>
      <HeaderAllBox>
        <HeaderBox>
          <LogoTitleBox>
            <ImgBox onClick={mainPageMove}>
              <Logo src={logoImg}></Logo>
            </ImgBox>
            <TitleSpan>칭찬을 구해요, 칭구</TitleSpan>
          </LogoTitleBox>
        </HeaderBox>
        {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
        {currentUser ? (
          <ButtonsBox>
            {/* // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression */}

            <DropDown>
              <DropBtn>{currentUser}님</DropBtn>
              <DropdownContents>
                <DropdownContent onClick={myPageMove}>마이페이지 </DropdownContent>
                <DropdownContent onClick={handleLogout}> 로그아웃 </DropdownContent>
              </DropdownContents>
            </DropDown>
          </ButtonsBox>
        ) : (
          <ButtonsBox>
            <LoginButton onClick={loginPageMove}>로그인</LoginButton>
            <SignUpButton onClick={signUpPageMove}>회원가입</SignUpButton>
          </ButtonsBox>
        )}
      </HeaderAllBox>
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
const ButtonsBox = styled.div`
  display: flex;
  position: absolute;
  right: 180px;
  top: 30px;
  gap: 12px;
  justify-content: center;
  align-items: center;
`

const LayOutBox = styled.div`
  width: 100vw;
  height: 100vh;
`
const HeaderAllBox = styled.div`
  display: flex;
  /* width: 100vw; */
  height: 80px;
  padding: 12px 0px;
  margin: 0 56px;
  justify-content: center;
  align-items: center;
  background: #fff;
  position: relative;
`
const HeaderBox = styled.div`
  /* width: 100vw; */
  height: 56px;
  flex-shrink: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LogoTitleBox = styled.div`
  width: 207.66px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`

const ImgBox = styled.div`
  width: 39.66px;
  height: 27.496px;
  flex-shrink: 0;
  fill: #ad7d83;
`

const Logo = styled.img`
  width: 39.66px;
  height: 28px;
`
const TitleSpan = styled.span`
  font-family: 'LINE SEED Sans KR';
  font-weight: bold;
  color: #404040;
  font-size: 1.25rem;
`

// const ButtonsBox = styled.div`
//   display: flex;
//   justify-content: right;
//   align-items: center;
//   gap: 0.625rem;
// `

const LoginButton = styled.button`
  display: inline-flex;
  height: 44px;
  padding: 14px 28px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #69535f;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  cursor: pointer;
`
const SignUpButton = styled.button`
  display: inline-flex;
  height: 44px;
  padding: 14px 28px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #69535f;
  flex-shrink: 0;
  color: #69535f;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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

// 드롭다운박스 영역
const DropdownContents = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  font-weight: 400;
  background-color: #f9f9f9;
  min-width: 200px;
`

const DropDown = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${DropdownContents} {
    display: block;
  }
`

const DropBtn = styled.button`
  border: 1px solid rgb(37, 37, 37);
  border-radius: 4px;
  background-color: #f5f5f5;
  font-weight: 400;
  color: rgb(37, 37, 37);
  padding: 12px;
  width: 200px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
`

const DropdownContent = styled.div`
  display: block;
  text-decoration: none;
  color: rgb(37, 37, 37);
  font-size: 12px;
  padding: 12px 20px;
  text-align: center;

  &:hover {
    background-color: lightgray;
  }
`
