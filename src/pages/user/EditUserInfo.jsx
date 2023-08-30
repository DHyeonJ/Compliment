/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { auth, storage } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { getAuth, updatePassword } from 'firebase/auth'
function EditUserInfo() {
  const navigate = useNavigate()

  const user = auth.currentUser
  const loggedInUserEmail = user ? user.email : null

  const [profileImage, setProfileImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const handlePasswordUpdate = async (event) => {
    event.preventDefault()

    if (newPassword !== confirmNewPassword) {
      alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      const user = auth.currentUser

      if (!user) {
        alert('사용자 정보를 가져올 수 없습니다.')
        return
      }

      await updatePassword(user, newPassword)

      alert('비밀번호 업데이트 성공')
      navigate('/') // Navigate to the home page after password change
    } catch (error) {
      console.error('비밀번호 업데이트 오류:', error)

      if (error.code === 'auth/requires-recent-login') {
        alert('비밀번호 변경을 위해선 재로그인이 필요합니다.')
      } else {
        alert('비밀번호 변경 실패: ' + error.message)
      }
    }
  }

  // 이미지 선택 시 호출되는 함수로, 선택한 이미지를 프로필 이미지로 설정합니다.
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0]
    if (selectedImage) {
      const reader = new FileReader()
      reader.onload = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(selectedImage)
    }
  }

  // 이미지 업로드를 처리하는 함수입니다.
  const handleImageUpload = async () => {
    if (profileImage) {
      try {
        const storageRef = storage.ref(`files/${profileImage.name}`)
        const imageRef = storageRef.child(`profileImages/${loggedInUserEmail}`)

        // 이미지 업로드
        const snapshot = await imageRef.putString(profileImage, 'data_url', { contentType: 'image/jpeg' })

        console.log('이미지 업로드 성공:', snapshot)

        // 업로드한 이미지의 다운로드 URL을 가져와 imageUrl 상태에 설정합니다.
        const downloadURL = await snapshot.ref.getDownloadURL()
        setImageUrl(downloadURL)
      } catch (error) {
        console.error('이미지 업로드 오류:', error)
      }
    }
  }
  console.log('2', user.reauthenticateWithCredential)
  return (
    <>
      <EditUserInfoBox>
        <div>
          <EditTitleBox>회원정보수정</EditTitleBox>
          <EditTextBox>칭구의 일원이 되어 긍정적인 에너지를 나눠보세요.</EditTextBox>
        </div>
        <ProfileImageBox>
          <ProfileImagePreview src={imageUrl || profileImage} alt="프로필 미리보기" />
          <ProfileImageInput onChange={handleImageChange} placeholder="프로필사진 등록하기" type="file" accept="image/jpeg" />
          <ProfileImageBtn onClick={handleImageUpload}>이미지 업로드</ProfileImageBtn>
        </ProfileImageBox>
        <EditForm onSubmit={handlePasswordUpdate}>
          <EditInputAreaBox>
            <EditInputLabelBox>아이디</EditInputLabelBox>
            <EditIdBox>{loggedInUserEmail}</EditIdBox>
          </EditInputAreaBox>
          <EditInputAreaBox>
            <EditInputLabelBox>닉네임</EditInputLabelBox>
            <EditInput placeholder="닉네임을 입력해주세요 " type="text" name="nickname" />
          </EditInputAreaBox>{' '}
          <EditInputAreaBox>
            <EditInputLabelBox>새 비밀번호</EditInputLabelBox>
            <EditInput placeholder="새 비밀번호를 입력해주세요" type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </EditInputAreaBox>
          <EditInputAreaBox>
            <EditInputLabelBox>새 비밀번호 확인</EditInputLabelBox>
            <EditInput placeholder="새 비밀번호를 다시 입력해주세요" type="password" name="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
          </EditInputAreaBox>
          <EditInputAreaBox>
            <EditSaveBtn type="submit">저장하기</EditSaveBtn>
            <CancleBtn>취소</CancleBtn>
          </EditInputAreaBox>
        </EditForm>
      </EditUserInfoBox>
    </>
  )
}

export default EditUserInfo

const EditUserInfoBox = styled.div`
  display: flex;
  height: 975 px;
  width: 736px;
  flex: 100;
  flex-direction: column;
  align-items: center; /* 변경된 부분: 가운데 정렬 */
  gap: 48 px;
  flex-shrink: 0;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
`

const EditTitleBox = styled.div`
  color: #404040;
  text-align: center;
  font-family: LINE Seed Sans KR;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 8px;
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
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
  border-radius: 60px;
`

const ProfileImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProfileImageInput = styled.input`
  display: inline-block;
  height: 30px;
  padding: 10px 10px 10px 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 78%;
  color: #999999;
`

const ProfileImageBtn = styled.button`
  display: block;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 0;
  color: #8f8989;
  background-color: white;
  cursor: pointer;
`
const EditForm = styled.form`
  text-align: left;
`

const EditInputAreaBox = styled.div`
  margin-left: 128px;
  margin-right: 128px;
  width: 480px;
`

const EditInputLabelBox = styled.div`
  display: flex;
  width: 480px;
  height: 20px;
  padding: 0px 8px;
  margin-top: 32px;
  align-items: center;
  flex-shrink: 0;
  color: #404040;
`
const EditIdBox = styled.div`
  display: flex;
  width: 480px;
  height: 42px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #d9d9d9;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  color: #d9d9d9;
`
const EditInput = styled.input`
  display: flex;
  width: 480px;
  height: 42px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #d9d9d9;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
  color: #d9d9d9;
`
const EditSaveBtn = styled.button`
  display: flex;
  width: 480px;
  height: 56px;
  padding: 13px 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  border: none;
  background: #69535f;
  margin-top: 48px;
  margin-bottom: 48px;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.64px;
  cursor: pointer;
  margin-bottom: 12px;
`
const CancleBtn = styled.button`
  display: flex;
  width: 480px;
  height: 56px;
  padding: 13px 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #69535f;
  color: #69535f;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
