/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { auth, storage, ref, getDownloadURL, db } from '../../firebase'
import defaultProfileImage from '../../img/user.png'
import ProgressBar from '../../components/ProgressBar'
import Tab from '../../components/Tab'
import userInfoEdit from '../../img/userInfoEdit.png'

function Mypage() {
  // 부모 컴포넌트에서 유저 정보 가져오기
  const localUser = JSON.parse(localStorage.getItem('user'))

  const navigator = useNavigate()

  const user = auth.currentUser
  const [highlightedButton, setHighlightedButton] = useState('detail')
  const [imageUrl, setImageUrl] = useState('')

  const EditUserpageMove = () => {
    navigator('/EditUserInfo')
  }
  const photoURL = user ? user.photoURL : null
  // 이메일에서 id값만 불러오기
  const localUserid = JSON.parse(localStorage.getItem('user'))

  const email = localUserid?.email
  const localStorageUserId = email.split('@')[0]

  // 프로필 불러오기 값만 불러오기
  const photoImg = localUserid?.photoURL

  useEffect(() => {
    // 사용자 정보 가져오기
    const fetchUserInfo = async () => {
      if (auth.currentUser) {
        try {
          const userUid = auth.currentUser.uid
          const path = `profileImages/${userUid}/photoURL`
          const storageRef = ref(storage, path)

          // 스토리지 참조를 생성한 후에 다운로드 URL을 가져옵니다.
          const url = await getDownloadURL(storageRef)
          console.log(url)
          setImageUrl(url || defaultProfileImage)
        } catch (error) {
          console.log('Error fetching image URL:', error)
          setImageUrl(defaultProfileImage)
        }
      }
    }
    fetchUserInfo()
  }, [])
  return (
    <>
      <div>
        <MypageBox>
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
  width: 100px;
  height: 100px;
  box-shadow: 5px 3px 7px 3px #c4c4c4;
  border-radius: 50%;
  margin-right: 10px;
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
  display: flex;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 14px;
  cursor: pointer;
`
const Bold = styled.span`
  font-weight: 700;
`
const UserButton = styled.img`
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
`
const RateBox = styled.div`
  display: flex;
  width: 880px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 36px;
`
const ListBox = styled.div`
  display: flex;
  width: 880px;
  height: 812px;
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
    /* background-color: #F0F0F0; */
  }
  &:hover {
    /* text-decoration: underline; */
    /* background-color: #F0F0F0; */
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
    /* background-color: #F0F0F0; */
  }
  &:hover {
    /* text-decoration: underline; */
    /* background-color: #F0F0F0; */
  }
`
