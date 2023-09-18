import React from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase.js'

function Alert() {
  return <></>
}

export default Alert

export const loginComplite = () => {
  Swal.fire({
    // position: 'top-end',
    icon: 'success',
    title: ' 성공 ',
    text: '로그인이 완료되었습니다.',
    showConfirmButton: false,
    timer: 1500,
  })
}

export const alreadyInUseEmailError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 이메일 오류! ',
    text: '이미 가입되어 있는 이메일 입니다. ',
  })
}

export const validEmailError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 이메일 오류! ',
    text: '이메일 형식을 확인 해주세요 . ',
  })
}

export const weakPWError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 비밀번호 오류! ',
    text: '비밀번호는 6자 이상이 되어야 합니다.',
  })
}

export const emptyPWError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 비밀번호 오류! ',
    text: '비밀 번호는 필수 기재사항입니다 ',
  })
}

export const confirmPWError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 비밀번호 오류! ',
    text: '비밀번호가 일치하지 않습니다. ',
  })
}

export const signupSuccess = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: '회원가입이 완료되었습니다!',
    showConfirmButton: false,
    timer: 1500,
  })
}

export const failedError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 회원가입 실패  ',
    text: '오류가 발생 하였습니다 .',
  })
}

export const confirmNicknameError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 회원가입 실패 ',
    text: '닉네임을 입력해주세요.',
  })
}

export const userNotFound = () => {
  Swal.fire({
    icon: 'error',
    title: '로그인 실패',
    text: '가입된 정보가 확인 되지 않습니다.',
  })
}
// Signup
export const worngPassword = () => {
  Swal.fire({
    icon: 'error',
    title: '로그인 실패',
    text: '비밀번호를 확인 해주세요 ',
  })
}

export const invalidEmail = () => {
  Swal.fire({
    icon: 'error',
    title: '로그인 실패',
    text: '이메일 형식을 확인 해주세요 ',
  })
}

export const emptyEmailError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 이메일 오류! ',
    text: '이메일은 필수 기재사항입니다 ',
  })
}

export const deleteSuccess = () => {
  Swal.fire({
    icon: 'success',
    title: ' 삭제 완료 ',
    text: '마이페이지로 이동합니다!! ',
    timer: 800,
  })
}

export const needLogin = () => {
  Swal.fire({
    icon: 'success',
    title: ' 로그인 해주세요 ',
    text: ' 잠시후 다시 시도해주세요. ',
    // timer: 800,
  })
}

export const editSuccess = () => {
  Swal.fire({
    icon: 'success',
    title: ' 수정 완료 ',
    text: '수정이 완료되었습니다!! ',
    timer: 800,
  })
}

export const logout = () => {
  Swal.fire({
    title: '로그아웃하시겠습니까?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '로그아웃',
    cancelButtonText: '취소',
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire('로그아웃되었습니다.', '', 'success')
      try {
        await signOut(auth)
        Swal.fire('로그아웃되었습니다.', '', 'success')
      } catch (error) {
        Swal.fire('로그아웃 중 오류가 발생했습니다.', '', 'error')
      }
    }
  })
}

export const confirmDelete = (onDelete) => {
  Swal.fire({
    title: '정말로 삭제하시겠습니까?',
    text: '한 번 삭제하면 되돌릴 수 없습니다!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '삭제',
    cancelButtonText: '취소',
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete()
    }
  })
}

export const confirmEdit = (onEdit) => {
  Swal.fire({
    title: '게시글 수정',
    text: '정말로 이 게시글을 수정하시겠습니까?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '수정',
    cancelButtonText: '취소',
  }).then((result) => {
    if (result.isConfirmed) {
      onEdit()
    }
  })
}

export const pleaseWrite = () => {
  Swal.fire({
    icon: 'info',
    title: '작성해 주세요',
    text: '내용을 입력해 주세요.',
  })
}

export const confirmEditComment = (onEdit) => {
  Swal.fire({
    title: '댓글 수정',
    text: '댓글을 수정하시겠습니까?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '수정',
    cancelButtonText: '취소',
  }).then((result) => {
    if (result.isConfirmed) {
      onEdit()
    }
  })
}

export const newConfirmPWError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 비밀번호 오류! ',
    text: '새비밀번호가 일치하지 않습니다. ',
  })
}

export const needPwe = () => {
  Swal.fire({
    icon: 'error',
    title: ' 비밀번호를 입력하세요 ',
    text: ' 잠시후 다시 시도해주세요. ',
  })
}

export const worngPwe = () => {
  Swal.fire({
    icon: 'error',
    title: ' 비밀번호가 올바르지 않습니다 ',
    text: ' 잠시후 다시 시도해주세요. ',
  })
}

export const imgSize = () => {
  Swal.fire({
    icon: 'error',
    title: ' 이미지 오류 ',
    text: ' 이미지 크기는 5MB를 초과할 수 없습니다. ',
  })
}

export const notFound = () => {
  Swal.fire({
    icon: 'error',
    title: '사용자 정보',
    text: '가입된 정보가 확인 되지 않습니다.',
  })
}

export const editUserSuccess = () => {
  // const navigate = useNavigate()
  Swal.fire({
    icon: 'error',
    title: '변경 완료',
    text: '회원 정보 변경 완료',
    // }).then(() => {
    //   navigate('/')
  })
}

export const needReauthentication = () => {
  Swal.fire({
    icon: 'info',
    title: '재로그인 필요',
    text: '비밀번호 변경을 위해서는 재로그인이 필요합니다.',
  })
}

export const notEditPwe = () => {
  Swal.fire({
    icon: 'error',
    title: ' 비밀번호 변경 실패',
    text: '비밀번호 변경을 실패 하였습니다.',
  })
}
