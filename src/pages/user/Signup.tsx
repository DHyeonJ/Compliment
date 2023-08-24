import React from 'react';
import { styled } from 'styled-components';
function Signup(): JSX.Element {
  return (
    <>
      <div>
        <SignupH1>회원가입 </SignupH1>
        <SignupText>칭구의 일원이 되어 긍정적인 에너지를 나눠보세요!</SignupText>
      </div>
      <SignupArea>
        <SignupImg />
        <button>프로필이미지등록gg</button>
        <div>
          <div>
            <SignForm>
              <SignInputArea>
                <div>아이디</div>
                <input placeholder="아이디를 입력해주세요" type="email" name="email" />
              </SignInputArea>
              <SignInputArea>
                <div>비밀번호</div>
                <input placeholder="비밀번호" type="password" name="password" />
              </SignInputArea>
              <SignInputArea>
                <div>비밀번호 확인</div>
                <input placeholder="비밀번호확인" type="password" name="confirmPassword" />
              </SignInputArea>
              <SignInputArea>
                <div>닉네임</div>
                <input placeholder="닉네임" type="text" name="nickname" />
              </SignInputArea>
              <SignInputArea>
                <button onClick={Signup}>회원가입</button>
              </SignInputArea>
            </SignForm>
          </div>
        </div>
      </SignupArea>
    </>
  );
}

export default Signup;

const SignupText = styled.div`
  color: #404040;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
`;

const SignupH1 = styled.div`
  color: #404040;
  text-align: center;
  font-family: LINE Seed Sans KR;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const SignupArea = styled.div`
  display: flex;
  height: 690 px;
  flex-direction: column;
  align-items: center; /* 변경된 부분: 가운데 정렬 */
  gap: 48 px;
  flex-shrink: 0;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const SignupImg = styled.div`
  width: 300 px;
  height: 300 px;
  fill: #f4f1e9;
  stroke-width: 2px;
  stroke: rgba(106, 106, 106, 0.5);
  background-color: gray;
`;

const SignForm = styled.form`
  text-align: left;
`;

const SignInputArea = styled.div`
  margin: 15px;
`;
