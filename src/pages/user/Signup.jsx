import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { auth } from '../../firebase.js'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import logoImg from '../../img/logo_big.png'
import google from '../../img/google.png'
import { debounce } from 'lodash'
import { emptyEmailError, emptyPWError, confirmPWError, validEmailError, signupSuccess, alreadyInUseEmailError, failedError, weakPWError } from '../../components/Alert.jsx'

function Signup() {
  const navigate = useNavigate()
  const MainpageMove = () => {
    navigate('/')
  }

  // 회원가입시 필요한 정보
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
    if (name === 'confirmPassword') {
      setConfirmPassword(value)
    }
  }

  const signup = async (e) => {
    e.preventDefault()
    if (email.length === 0) {
      emptyEmailError()
    } else if (password.length === 0 || confirmPassword.length === 0) {
      emptyPWError()
    } else if (password !== confirmPassword) {
      confirmPWError()
    }

    if (password === confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        // The provider which was used to authenticate the user.
        // await setMissionCard(userCredential.user.uid)

        signupSuccess()

        // 로그인이 완료되었을 때 사용자 정보 확인

        const user = userCredential.user
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        navigate('/')
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alreadyInUseEmailError()
        } else if (error.code === 'auth/weak-password') {
          weakPWError()
        } else if (error.code === 'auth/invalid-email') {
          validEmailError()
        } else {
          console.log(error)
          failedError()
        }
      }
    }
  }

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
  // 실시간 유효성검사

  const [validEmail, setValidEmail] = useState(true)
  const [validPassword, setValidpassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
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

  const debounceValidatePassword = debounce((password) => {
    if (password.length > 0 && password.length < 6) {
      setValidpassword('비밀번호는 6자 이상이어야 합니다.')
    } else {
      setValidpassword('')
    }
  }, 100)

  useEffect(() => {
    debounceValidatePassword(password)
  }, [password])

  useEffect(() => {
    debounceValidateConfirmPassword(password, confirmPassword)
  }, [password, confirmPassword])

  const debounceValidateConfirmPassword = debounce((password, confirmPassword) => {
    if (password !== confirmPassword && confirmPassword.length > 0) {
      // confirmPassword가 비어있지 않은지 확인합니다.
      setConfirmPasswordError('비밀번호가 일치하지 않습니다')
    } else {
      setConfirmPasswordError('')
    }
  }, 100)

  return (
    <>
      <SignupBox>
        <div>
          <LogoImg src={logoImg} onClick={MainpageMove}></LogoImg>
          <SignupH1Box>회원가입 </SignupH1Box>
          <SignupTextBox>칭구의 일원이 되어 긍정적인 에너지를 나눠보세요!</SignupTextBox>
        </div>
        <SignupAreaBox>
          {/* <SignupImgBox src={logoImg} /> */}
          {/* <button>프로필이미지등록</button> */}
          <div>
            <div>
              <SignForm onSubmit={signup}>
                <SignInputAreaBox>
                  <SignupInputLabel htmlFor="email">이메일</SignupInputLabel>
                  <SignupInput placeholder="이메일을 입력해주세요" type="email" name="email" value={email} onChange={onChange} />
                  {!validEmail && email.length > 0 && <DebounceTextBox>유효한 이메일이 아닙니다.</DebounceTextBox>}{' '}
                </SignInputAreaBox>
                <SignInputAreaBox>
                  <SignupInputLabel htmlFor="password">비밀번호</SignupInputLabel>
                  <SignupInput placeholder="비밀번호를 입력해주세요" type="password" name="password" value={password} onChange={onChange} />
                  {password.length > 0 && password.length < 6 && <DebounceTextBox>비밀번호는 6자 이상이어야 합니다.</DebounceTextBox>}
                </SignInputAreaBox>
                <SignInputAreaBox>
                  <SignupInputLabel htmlFor="confirmPassword">비밀번호 확인</SignupInputLabel>
                  <SignupInput placeholder="비밀번호를 입력해주세요" type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} />
                  {confirmPasswordError && <DebounceTextBox>{confirmPasswordError}</DebounceTextBox>}
                </SignInputAreaBox>
                {/* <SignInputAreaBox>
                   <SignupInputLabel>닉네임</SignupInputLabel>
                   <SignupInput placeholder="닉네임을 입력해주세요 " type="text" name="nickname" />
                 </SignInputAreaBox> */}
                <SignInputAreaBox>
                  {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                  <SignupBtn isValidEmail={validEmail} disabled={!validEmail}>
                    가입하기
                  </SignupBtn>
                </SignInputAreaBox>
              </SignForm>
            </div>
            <SignWithGoogleArea>
              <SignLineBox> ㅡ OR ㅡ </SignLineBox>
              <SignWithGoogleBtn onClick={handleGoogleLogin}>
                <GoogleLogoImg src={google}></GoogleLogoImg>Google로 시작하기
              </SignWithGoogleBtn>
            </SignWithGoogleArea>
          </div>
        </SignupAreaBox>
      </SignupBox>
    </>
  )
}

export default Signup

const SignupBox = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 100vh;
`

const LogoImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  height: 75px;
  margin-left: 10vw;
  margin-right: 10vw;
  padding: 24px 43px 25px 41px;
  cursor: pointer;
`
const SignupTextBox = styled.div`
  line-height: normal;
  text-align: center;
  color: #404040;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`

const SignupH1Box = styled.div`
  line-height: normal;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #404040;
  text-align: center;
  font-family: LINE Seed Sans KR;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
`

const SignupAreaBox = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 100;
  flex-direction: column;
  align-items: center;
  display: flex;
  gap: 48 px;
  flex-shrink: 0;
  text-align: center;
  width: 80vw;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 10vw;
  margin-right: 10vw;
`

const SignForm = styled.form`
  text-align: left;
  width: 100%;
`

const SignInputAreaBox = styled.div`
  width: 480px;
  margin-left: 128px;
  margin-right: 128px;
`

const SignupInputLabel = styled.label`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 480px;
  height: 20px;
  padding: 0px 8px;
  margin-top: 32px;
  color: #404040;
`

const SignupInput = styled.input`
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
  color: #0e0d0d;

  &::placeholder {
    color: #d9d9d9;
    font-weight: 500;
    line-height: normal;
  }
`
const SignupBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  letter-spacing: -0.64px;
  width: 480px;
  height: 56px;
  margin-top: 48px;
  margin-bottom: 48px;
  padding: 13px 32px;
  background: ${({ isValidEmail }) => (isValidEmail ? '#69535f' : '#ccc')};
  border-radius: 8px;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: ${({ isValidEmail }) => (isValidEmail ? 'pointer' : 'not-allowed')};
`
const SignWithGoogleArea = styled.div`
  margin-left: 128px;
  margin-right: 128px;
`

const SignLineBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  justify-content: center;
  width: 480px;
  height: 19px;
  color: #666666;
  margin-top: -17px;
`

const SignWithGoogleBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  line-height: 110%; /* 17.6px */
  width: 480px;
  height: 56px;
  margin-top: 16px;
  padding: 8px 0px;
  border-radius: 8px;
  border: 1px solid #404040;
  color: #404040;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  background: var(--white, #fff);
  cursor: pointer;
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
