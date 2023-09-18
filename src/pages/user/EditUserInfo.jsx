/* eslint-disable import/first */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-misused-promises */
// eslint-disable-next-line import/first
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { auth, storage, db } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { updatePassword, updateProfile, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import defaultImg from '../../img/user.png'
function EditUserInfo() {
  const navigate = useNavigate()
  const MainpageMove = () => {
    navigate('/')
  }
  const [error, setError] = useState(null)
  const user = auth.currentUser
  const loggedInUserEmail = user ? user.email : null
  const [imageUrl, setImageUrl] = useState(null)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const handlePasswordUpdate = async (event) => {
    event.preventDefault()

    if (!currentPassword) {
      alert('현재 비밀번호를 입력해주세요.')
      return
    }

    try {
      if (!user) {
        alert('사용자 정보를 가져올 수 없습니다.')
        return
      }

      const credentials = EmailAuthProvider.credential(loggedInUserEmail, currentPassword)
      await reauthenticateWithCredential(user, credentials)

      if (newPassword !== confirmNewPassword) {
        alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.')
        return
      }

      await updatePassword(user, newPassword)

      alert('회원 정보 변경 완료')
      navigate('/')
    } catch (error) {
      console.error('회원 정보 변경 오류:', error)

      if (error.code === 'auth/wrong-password') {
        // 잘못된 현재 비밀번호 처리
        alert('현재 비밀번호가 올바르지 않습니다.')
      } else if (error.code === 'auth/requires-recent-login') {
        alert('비밀번호 변경을 위해선 재로그인이 필요합니다.')
        navigate('/login')
      } else {
        alert('비밀번호 변경 실패: ' + error.message)
      }
    }
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) {
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB를 초과하는 경우
      alert('이미지 크기는 5MB를 초과할 수 없습니다.')
      return
    }

    const storageRef = ref(storage, `profileImages/${user.uid}/${file.name}`)
    try {
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          alert('Error uploading image:', error)
        },
        () => {
          // 업로드가 완료되면 실행되는 부분
          getDownloadURL(storageRef)
            .then(async (downloadURL) => {
              setImageUrl(downloadURL)

              if (user) {
                await updateProfile(user, { photoURL: downloadURL })
              }
            })
            .catch((downloadError) => {
              console.error('Error getting download URL:', downloadError)
            })
        },
      )
    } catch (uploadError) {
      console.error('Error uploading image:', uploadError)
    }
  }
  return (
    <>
      <EditUserInfoBox>
        <div>
          <EditTitleBox>회원정보수정</EditTitleBox>
          <EditTextBox>칭구의 일원이 되어 긍정적인 에너지를 나눠보세요.</EditTextBox>
        </div>
        <ProfileImageBox>
          <ProfileImagePreview src={imageUrl || defaultImg} alt="프로필사진 미리보기" />
          {user && !user.providerData.some((provider) => provider.providerId === 'google.com') && (
            <label htmlFor="file">
              <ProfileImageBoxBtn>프로필 이미지 변경</ProfileImageBoxBtn>
            </label>
          )}
          <ProfileImageInput type="file" name="file" id="file" accept="image/*" onChange={handleImageUpload}></ProfileImageInput>
          {/* {error && <p>{error}</p>} */}
        </ProfileImageBox>
        <EditForm onSubmit={handlePasswordUpdate}>
          <EditInputAreaBox>
            <EditInputLabelBox>아이디</EditInputLabelBox>
            <EditIdBox>{loggedInUserEmail}</EditIdBox>
          </EditInputAreaBox>
          {user && user.providerData.some((provider) => provider.providerId === 'google.com') && (
            <EditInputAreaBox>
              <EditInputLabelBox>닉네임</EditInputLabelBox>
              <EditInput placeholder="닉네임을 입력해주세요 " type="text" name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            </EditInputAreaBox>
          )}
          {/* <EditInputAreaBox>
            <EditInputLabelBox>닉네임</EditInputLabelBox>
            <EditInput placeholder="닉네임을 입력해주세요 " type="text" name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </EditInputAreaBox> */}
          <EditInputAreaBox>
            <EditInputLabelBox>현재 비밀번호</EditInputLabelBox>
            <EditInput placeholder="현재 비밀번호를 입력해주세요" type="password" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </EditInputAreaBox>
          <EditInputAreaBox>
            <EditInputLabelBox>새 비밀번호</EditInputLabelBox>
            <EditInput placeholder="새 비밀번호를 입력해주세요" type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </EditInputAreaBox>
          <EditInputAreaBox>
            <EditInputLabelBox>새 비밀번호 확인</EditInputLabelBox>
            <EditInput placeholder="새 비밀번호를 다시 입력해주세요" type="password" name="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
          </EditInputAreaBox>
          <EditInputAreaBox>
            <EditSaveBtn type="submit" onClick={handleSave}>
              저장하기
            </EditSaveBtn>
          </EditInputAreaBox>
        </EditForm>
        <CancleBtn onClick={MainpageMove}>취소</CancleBtn>
      </EditUserInfoBox>
    </>
  )
}

export default EditUserInfo

const EditUserInfoBox = styled.div`
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  display: flex;
  gap: 4vh;
  text-align: center;
  height: 120vh;
  width: 80vw;
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px;
`

const EditTitleBox = styled.div`
  text-align: center;
  margin-bottom: 8px;
  color: #404040;
  font-family: LINE Seed Sans KR;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
`

const EditTextBox = styled.div`
  color: #404040;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const ProfileImagePreview = styled.img`
  width: 100px;
  height: 100px;
  max-width: 150px;
  max-height: 150px;
  margin-top: 30px;
  margin-bottom: 10px;
  border-radius: 100px;
  border: 5px solid #dad7d7;
`

const ProfileImageBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const ProfileImageBoxBtn = styled.div`
  cursor: pointer;
  color: var(--text01_404040, #404040);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  &:hover {
    color: #69535f;
  }
`

const ProfileImageInput = styled.input`
  display: none;
`

const ProfileImageBtn = styled.button`
  display: none;
  background-color: white;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 0;
  color: #69535f;
  cursor: pointer;
  &:hover {
    /* 호버 스타일 */
    transform: scale(1.02);
  }
`

const EditForm = styled.form`
  align-items: center;
  text-align: left;
  flex-direction: column;
  margin-top: 20px;
`

const EditInputAreaBox = styled.div`
  width: 480px;
  margin-left: 128px;
  margin-right: 128px;
`

const EditInputLabelBox = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 480px;
  height: 20px;
  padding: 0px 8px;
  margin-top: 32px;
  color: #404040;
`

const EditIdBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  width: 480px;
  height: 42px;
  border-bottom: 1px solid #d9d9d9;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  color: #d9d9d9;
`

const EditInput = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 480px;
  height: 42px;
  border-bottom: 1px solid #d9d9d9;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  color: #d9d9d9;
`

const EditSaveBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
  flex-shrink: 0;
  line-height: normal;
  letter-spacing: -0.64px;
  width: 480px;
  height: 56px;
  margin-top: 48px;
  margin-bottom: 48px;
  margin-bottom: 12px;
  padding: 13px 32px;
  background: #69535f;
  border-radius: 8px;
  border: none;
  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    /* 호버 스타일 */
    transform: scale(1.02);
  }
`
const CancleBtn = styled.button`
  display: flex;
  gap: 10px;
  line-height: normal;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 480px;
  height: 56px;
  padding: 13px 32px;
  border-radius: 8px;
  border: 1px solid #69535f;
  color: #69535f;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  &:hover {
    /* 호버 스타일 */
    transform: scale(1.02);
  }
`
const TextBox = styled.div`
  width: 480px;
  margin: 20px 128px 20px 128px;
`
