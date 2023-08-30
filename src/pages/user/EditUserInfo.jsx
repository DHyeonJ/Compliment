import React from 'react'
import { styled } from 'styled-components'

function EditUserInfo() {
  return (
    <>
      <EditUserInfoBox>
        <div>
          <EditTitleBox>회원정보수정</EditTitleBox>
          <EditTextBox>칭구의 일원이 되어 긍정적인 에너지를 나눠보세요.</EditTextBox>
        </div>
        <div>
          <div>프로필이미지 박스</div>
          <button>프로필이미지 변경</button>
        </div>
        <EditForm>
          <EditInputAreaBox>
            <EditInputLabelBox>아이디</EditInputLabelBox>
            <EditInput placeholder="아이디를 입력해주세요" type="email" name="email" />
          </EditInputAreaBox>
          <EditInputAreaBox>
            <EditInputLabelBox>닉네임</EditInputLabelBox>
            <EditInput placeholder="닉네임을 입력해주세요 " type="text" name="nickname" />
          </EditInputAreaBox>
          <EditInputAreaBox>
            <EditInputLabelBox>비밀번호</EditInputLabelBox>
            <EditInput placeholder="비밀번호를 입력해주세요" type="password" name="password" />
          </EditInputAreaBox>
          <EditInputAreaBox>
            <EditInputLabelBox>비밀번호 확인</EditInputLabelBox>
            <EditInput placeholder="비밀번호를 입력해주세요" type="password" name="confirmPassword" />
          </EditInputAreaBox>

          <EditInputAreaBox>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <EditSaveBtn>저장하기</EditSaveBtn>
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
