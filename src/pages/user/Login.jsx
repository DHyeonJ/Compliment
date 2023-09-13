import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { auth } from '../../firebase.js'
import 'firebase/firestore'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import logoImg from '../../img/logo_big.png'
import google from '../../img/google.png'
import { debounce } from 'lodash'

function Login() {
  const navigate = useNavigate()
  const mainMove = () => {
    navigate('/')
  }
  const signUpPageMove = () => {
    navigate('/signup')
  }

  const notFountPageMove = () => {
    navigate('*')
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [googleUserData, setGoogleUserData] = useState(null)

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((data) => {
        setGoogleUserData(data.user)
        navigate('/')
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
      } else if (error.code === 'auth/wrong-password') {
        worngPassword()
      } else {
        failedError()
      }
    }
    setEmail('')
    setPassword('')
  }

  const [validEmail, setValidEmail] = useState(true)

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const debounceValidateEmail = debounce((email) => {
    const result = validateEmail(email)
    setValidEmail(result)
  }, 500)

  useEffect(() => {
    if (email) {
      debounceValidateEmail(email)
    }
  }, [email])

  return (
    <>
      <LoginArea>
        <div>
          <LogoImg onClick={mainMove} src={logoImg}></LogoImg>
          <LogoTextBox>칭찬을 구해요, 칭구</LogoTextBox>
        </div>
        <LoginForm>
          <LoginInputArea>
            <LoginInputLabel>이메일</LoginInputLabel>
            <LoginInput placeholder="이메일을 입력해주세요" type="email" name="email" value={email} onChange={onChange} />
            {!validEmail && email.length > 0 && <DebounceTextBox>유효한 이메일이 아닙니다.</DebounceTextBox>}{' '}
          </LoginInputArea>
          <LoginInputArea>
            <LoginInputLabel>비밀번호</LoginInputLabel>
            <LoginInput placeholder="비밀번호를 입력해주세요 " type="password" name="password" value={password} onChange={onChange} />
          </LoginInputArea>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <LoginBtn onClick={Signin}>로그인하기</LoginBtn>
        </LoginForm>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <SignWithGoogleBtn onClick={handleGoogleLogin}>
          <GoogleLogoImg src={google}></GoogleLogoImg>Google로 로그인하기
        </SignWithGoogleBtn>
        <LoginTextArea>
          <LoginText onClick={notFountPageMove}>아이디/ 비밀번호 찾기</LoginText>
          <LoginText onClick={signUpPageMove}> │ 회원가입</LoginText>
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
const LogoImg = styled.img`
  margin-left: 308px;
  margin-right: 308px;
  width: 36px;
  display: flex;
  width: 120px;
  height: 75px;
  padding: 24px 43px 25px 41px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
`
const LogoTextBox = styled.div`
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
  color: #1a1919;
  &::placeholder {
    color: #d9d9d9;
    font-weight: 500;
    line-height: normal;
  }
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
  background: #69535f;
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
  cursor: pointer;
`
const LoginBlank = styled.div`
  height: 95px;
  margin-bottom: 48px;
`

const GoogleLogoImg = styled.img`
  width: 25px;
  height: 25px;
`
const DebounceTextBox = styled.div`
  color: #e36f6f;
  font-family: Noto Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
