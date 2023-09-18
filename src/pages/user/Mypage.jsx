/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { auth, storage, ref, getDownloadURL, db } from '../../firebase'
import defaultProfileImage from '../../img/user.png'
import ProgressBar from '../../components/ProgressBar'
import Tab from '../../components/Tab'
import userInfoEdit from '../../img/userInfoEdit.png'
import Loading from '../../components/Loading'
import MenuNav from '../../components/MenuNav'

function Mypage() {
  const navigator = useNavigate()
  const [imageUrl, setImageUrl] = useState(defaultProfileImage)

  const EditUserpageMove = () => {
    navigator('/EditUserInfo')
  }
  // 이메일에서 id값만 불러오기
  const localUserid = JSON.parse(localStorage.getItem('user'))

  const email = localUserid?.email
  const localStorageUserId = email.split('@')[0]

  // 프로필 불러오기 값만 불러오기
  const photoImg = localUserid?.photoURL

  // 데이터 로딩 상태
  const [isLoading, setIsLoading] = useState(true)

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    if (auth.currentUser) {
      try {
        const userUid = auth.currentUser.uid
        const path = `profileImages/${userUid}/photoURL`
        const storageRef = ref(storage, path)

        // 스토리지 참조를 생성한 후에 다운로드 URL을 가져옵니다.
        const url = await getDownloadURL(storageRef)
        setImageUrl(url)
      } catch (error) {
        console.log('이미지 URL 가져오기 오류:', error)
      } finally {
        setIsLoading(false) // 데이터 가져오기가 완료되면 isLoading을 false로 설정
      }
    }
  }

  useEffect(() => {
    const checkAuthentication = () => {
      if (auth.currentUser) {
        fetchUserInfo()
      } else {
        // 로그인이 필요한 경우 로그인 페이지로 이동하도록 처리
        // 예: navigate('/login');
        setIsLoading(false) // 데이터 가져오기가 완료되지 않았을 경우 isLoading을 false로 설정
      }
    }
    checkAuthentication()
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <MenuNav />
          <MypageBox>
            <PageBox>
              <ProfileBox>
                <ProfileImage alt="프로필 이미지" src={photoImg ?? defaultProfileImage} />
                <TextBox>
                  <NicknameTextBox>
                    <Bold>{localStorageUserId}</Bold> 님 <br /> 안녕하세요.
                  </NicknameTextBox>
                  <SignEditBox onClick={EditUserpageMove}>
                    회원정보 수정
                    <UserButton src={userInfoEdit} />
                  </SignEditBox>
                </TextBox>
              </ProfileBox>
              <RateBox>
                <ProgressBar />
              </RateBox>
              <ListBox>
                <Tab />
              </ListBox>
            </PageBox>
          </MypageBox>
        </div>
      )}
    </>
  )
}
export default Mypage
const MypageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 240px 48px 240px;
`

const PageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 270px;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  box-sizing: border-box;
`

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 64px;
  flex-shrink: 0;
  width: 784px;
  height: 150px;
  padding: 0px 24px;
`
const ProfileImage = styled.img`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 50%;
  box-shadow: 5px 3px 7px 3px #c4c4c4;
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
  text-align: center;
  display: flex;
  margin-top: 14px;
  color: #666;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  cursor: pointer;
`
const Bold = styled.span`
  font-weight: 700;
`
const UserButton = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
`
const RateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 880px;
  margin-top: 36px;
`
const ListBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
  margin-top: 48px;
  padding: 0px 88px;
`
