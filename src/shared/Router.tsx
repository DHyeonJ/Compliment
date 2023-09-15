import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Main from '../pages/Main'
import NotFoundPage from '../pages/NotFoundPage'
import AddBoard from '../pages/board/AddBoard'
import DetailPage from '../pages/board/DetailPage'
import EditBoard from '../pages/board/EditBoard'
import ListPage from '../pages/board/ListPage'
import MissionPage from '../pages/MissionPage/MissionPage'
import Signup from '../pages/user/Signup'
import EditUserInfo from '../pages/user/EditUserInfo'
import Login from '../pages/user/Login'
import Layout from './Layout'
import Mypage from '../pages/user/Mypage'
import Loading from '../components/Loading'
import { auth } from '../firebase'
import type { User } from 'firebase/auth'

function Router() {
  const [user, setUser] = useState<User | null>(null) // 사용자 상태 추가
  const [isAuthenticated, setIsAuthenticated] = useState(false) // 인증 상태 추가
  const navigate = useNavigate() // useNavigate hook을 사용하여 경로 변경 함수를 가져옵니다.

  useEffect(() => {
    // Firebase에서 현재 사용자 가져오기
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user) // 사용자 정보 업데이트
      setIsAuthenticated(!!user) // 사용자가 존재하면 인증 상태를 true로 설정
    })

    return () => {
      // 컴포넌트가 언마운트될 때 Firebase 리스너 해제
      unsubscribe()
    }
  }, [])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/addboard" element={isAuthenticated ? <AddBoard /> : <Navigate to="/" state={{ message: '접근할 수 없는 페이지입니다.' }} />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/listpage" element={<ListPage />} />
        <Route path="/editboard/:id" element={isAuthenticated ? <EditBoard /> : <Navigate to="/" />} />
        <Route path="/missionpage" element={isAuthenticated ? <MissionPage /> : <Navigate to="/" />} />
        <Route path="/edituserinfo" element={isAuthenticated ? <EditUserInfo /> : <Navigate to="/" />} />
        <Route path="/mypage" element={isAuthenticated ? <Mypage /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="/loading" element={<Loading />} /> */}
      </Route>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
    </Routes>
  )
}

export default Router
