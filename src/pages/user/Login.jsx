import React, { useState } from 'react'
import { styled } from 'styled-components'
import { auth } from '../../firebase.js'
import 'firebase/firestore'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [googleUserData, setGoogleUserData] = useState(null)

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((data) => {
        setGoogleUserData(data.user)
      })
      .catch((err) => {
        alert(err)
      })
  }

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event
    if (name === 'email') {
      setEmail(value)
    }
    if (name === 'password') {
      setPassword(value)
    }
  }

  const emptyEmailError = () => {
    alert('이메일을 입력해주세요.')
  }

  const emptyPWError = () => {
    alert('비밀번호를 입력해주세요.')
  }

  const userNotFound = () => {
    alert('사용자를 찾을 수 없습니다.')
  }

  const invalidEmail = () => {
    alert('유효하지 않은 이메일 주소입니다.')
  }

  const worngPassword = () => {
    alert('비밀번호가 잘못되었습니다.')
  }

  const failedError = () => {
    alert('로그인에 실패하였습니다.')
  }

  const Signin = async (e) => {
    e.preventDefault()

    if (email.length === 0) {
      emptyEmailError()
    } else if (password.length === 0) {
      emptyPWError()
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        userNotFound()
      } else if (error.code === 'auth/invalid-email') {
        invalidEmail()
      } else if (error.code === 'auth/wrong-password') {
        worngPassword()
      } else {
        failedError()
      }
    }
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <LoginArea>
        <div>
          <Logo>Logo</Logo>
          <LogoText>칭찬을 구해요, 칭구</LogoText>
        </div>
        <LoginForm>
          <LoginInputArea>
            <LoginInputLabel>아이디</LoginInputLabel>
            <LoginInput placeholder="아이디를 입력해주세요" type="email" name="email" value={email} onChange={onChange} />
          </LoginInputArea>
          <LoginInputArea>
            <LoginInputLabel>비밀번호</LoginInputLabel>
            <LoginInput placeholder="비밀번호를 입력해주세요 " type="password" name="password" value={password} onChange={onChange} />
          </LoginInputArea>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <LoginBtn onClick={Signin}>로그인하기</LoginBtn>
        </LoginForm>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <SignWithGoogleBtn onClick={handleGoogleLogin}>Google로 로그인하기</SignWithGoogleBtn>
        <LoginTextArea>
          <LoginText>아이디/ 비밀번호 찾기</LoginText>
          <LoginText> │ 회원가입</LoginText>
        </LoginTextArea>
      </LoginArea>
      <LoginBlank></LoginBlank>
    </>
  )
}

export default Login
const LoginArea = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Logo = styled.div`
  margin-left: 308px;
  margin-right: 308px;
  width: 36px;
  height: 26;
  display: flex;
  width: 120px;
  height: 75px;
  padding: 24px 43px 25px 41px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: #d9d9d9;
`
const LogoText = styled.div`
  margin-left: 275px;
  margin-right: 275px;
  margin-top: 20px;

  color: var(--text-01404040, #404040);
  text-align: center;
  font-family: LINE Seed Sans KR;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const LoginForm = styled.form`
  margin-top: 48px;
`
const LoginInputArea = styled.div`
  padding-top: 4px;
  margin-bottom: 48px;
  width: 480px;
  height: 66px;
`

const LoginInputLabel = styled.div`
  display: flex;
  width: 480px;
  height: 20px;
  padding: 0px 8px;
  margin-top: 32px;
  align-items: center;
  flex-shrink: 0;
  color: #404040;
`
const LoginInput = styled.input`
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
const LoginBtn = styled.button`
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
  background: #6a6a6a;
  margin-top: 56px;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.64px;
  cursor: pointer;
`

const SignWithGoogleBtn = styled.button`
  display: flex;
  margin-top: 16px;
  width: 480px;
  height: 56px;
  padding: 8px 0px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid #404040;
  background: var(--white, #fff);
  color: #404040;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 17.6px */
  cursor: pointer;
`
const LoginTextArea = styled.div`
  display: block;
  width: 480px;
  height: 19px;
  margin-top: 50px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
`

const LoginText = styled.div`
  display: inline-block;
  margin-left: 10px;
`
const LoginBlank = styled.div`
  height: 95px;
  margin-bottom: 48px;
`
