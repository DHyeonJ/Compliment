/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useState as ReactUseState, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase.js'
import logoImg from '../img/logo.png'
import footerLogoImg from '../img/footer_logo.png'
import defaultProfileImage from '../img/user.png'
import { faArrowRightFromBracket, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { logout } from '../components/Alert.jsx'
interface User {
  uid: string | null
  email: string | null
  photoURL: string | null
}

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
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [photoURL, setPhotoURL] = useState<string | null>(defaultProfileImage)

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  const localUserid = JSON.parse(localStorage.getItem('user') || 'null')
  const email = localUserid?.email
  const localStorageUserId = email?.split('@')[0]
  const handleLogout = async () => {
    logout()
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (user) {
        setCurrentUser(user.email)
        setPhotoURL(user.photoURL)
        // 로컬스토리지 저장
        localStorage.setItem('user', JSON.stringify({ userId: user.uid, email: user.email, photoURL: user.photoURL ?? defaultProfileImage }))
      } else {
        setCurrentUser(null)
        setPhotoURL(null)
        // 로컬스토리지 삭제
        localStorage.removeItem('user')
      }
    })
  }, [])

  return (
    <LayOutBox>
      <HeaderAllBox>
        <HeaderBox>
          <LogoTitleBox onClick={mainPageMove}>
            <ImgBox>
              <Logo src={logoImg}></Logo>
            </ImgBox>
            <TitleSpan>칭찬을 구해요, 칭구</TitleSpan>
          </LogoTitleBox>
        </HeaderBox>
        {currentUser ? (
          <ButtonsBox>
            <DropDown>
              <UserNameBox>
                {localStorageUserId}
                <Bold>&nbsp;님</Bold>
              </UserNameBox>
              <ProfileImage alt="프로필 이미지" src={photoURL ?? defaultProfileImage} />

              <DropdownContents>
                <DropdownContent onClick={myPageMove}>
                  <DropdownImgBox>
                    <ImgIcon icon={faCircleUser} />
                  </DropdownImgBox>
                  <MypageBox>마이페이지</MypageBox>
                </DropdownContent>
                <LineBox />
                <DropdownContent onClick={handleLogout}>
                  <DropdownImgBox>
                    <ImgIcon icon={faArrowRightFromBracket} />
                  </DropdownImgBox>
                  <MypageBox>로그아웃</MypageBox>
                </DropdownContent>
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
          <FooterLogo src={footerLogoImg}></FooterLogo>
          <InfoBox>
            <FooterTitleBox>칭구</FooterTitleBox>
            <MakeTeamBox>Copyright 2023. 팀 해보조 all rights reserved.</MakeTeamBox>
            <CopyRightBox>Illustration in first home banner slide Designed by Freepik.</CopyRightBox>
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
  gap: 12px;
  justify-content: center;
  align-items: center;
  right: 56px;
`

const LayOutBox = styled.div`
  width: 100vw;
  height: 100vh;
`
const HeaderAllBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  position: relative;
  padding: 12px 0px;
  border-bottom: 1px solid #feedcd;
  background: #fff;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.12);
`
const HeaderBox = styled.div`
  flex-shrink: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LogoTitleBox = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`

const ImgBox = styled.div`
  flex-shrink: 0;
  fill: #ad7d83;
`

const Logo = styled.img`
  height: 75px;
`
const TitleSpan = styled.span`
  font-family: 'LINE SEED Sans KR';
  font-weight: bold;
  color: #404040;
  font-size: 1.25rem;
`

const LoginButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  padding: 14px 28px;
  border-radius: 8px;
  background: #69535f;
  color: #ffffff;
  border: none;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  cursor: pointer;
  &:hover {
    background-color: #986c6c;
    border-radius: 8px;
    font-size: 16px;
    font-family: Pretendard;
    font-weight: bold;
  }
`
const SignUpButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: 10px;
  height: 44px;
  padding: 14px 28px;
  border-radius: 8px;
  border: 1px solid #69535f;
  color: #69535f;
  text-align: center;
  background-color: #ffffff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  &:hover {
    background-color: #fffcf6;
    border: 1px solid #69535f;
    border-radius: 8px;
    font-size: 16px;
    font-family: Pretendard;
    font-weight: bold;
  }
`
const FooterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 18.5rem;
  background-color: #f4f1e9;
`

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const FooterLogo = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`
const FooterTitleBox = styled.div`
  display: flex;
  justify-content: center;
  color: #999;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 22.4px */
`

const InfoBox = styled.div`
  width: 368px;
  height: 66px;
`

const MakeTeamBox = styled.div`
  display: flex;
  justify-content: center;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  color: #999;
  font-family: Pretendard;
  font-size: 14px;
`
const CopyRightBox = styled.div`
  color: #999;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 22.4px */
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
  background-color: #ffffff;
  flex-direction: column;
  align-items: center;
  right: 0;
  top: 100%;
  border-radius: 8px;
  border: 1px solid #69535f;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.24);
  transition: display 0.3s; /* 추가: 애니메이션 효과 */

  &.open {
    display: flex; /* 표시 상태로 변경 */
  }
`
const UserNameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: #404040;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const Bold = styled.p`
  color: #404040;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const ProfileImage = styled.img`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50px;
  width: 50px;
  box-shadow: 3px 3px 5px 3px #c4c4c4;
  border-radius: 60px;
`
const DropDown = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  &:active ${DropdownContents} {
    display: flex;
  }

  &:hover ${DropdownContents} {
    display: flex;
  }
`
const DropdownImgBox = styled.div`
  display: flex;
  padding-right: 0px;
  align-items: center;
`
const ImgIcon = styled(FontAwesomeIcon)`
  width: 24px;
  height: 24px;
`
const MypageBox = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const DropdownContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  height: 48px;
  color: #69535f;
  border-radius: 8px 8px 0px 0px;
  font-weight: 500;

  &:hover {
    background-color: #986c6c;
    border-radius: 8px;
    color: #fffbf3; /* Hover 상태의 글자색 설정 */
    font-weight: bold;
    margin: 0;
    width: 100%;
  }
  & svg {
    width: 24px;
    height: 24px;
    color: inherit; /* 부모 요소의 color 값을 상속받아 아이콘 색상 설정 */
  }
`
const LineBox = styled.div`
  height: 1px;
  width: 136px;
  background-color: rgba(105, 83, 95, 0.3);
`
