import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { auth } from '../firebase.js'

export default function MenuNav() {
  const navigate = useNavigate()

  const listPageMove = () => {
    navigate('/listpage')
  }

  const missionPageMove = () => {
    if (auth.currentUser) {
      navigate('/missionpage')
    } else {
      alert('로그인 후에 확인 하실 수 있습니다.')
      navigate('/login')
    }
  }
  return (
    <NavBox>
      <ListBox isActive={location.pathname === '/listpage'}>
        <ListTextBox onClick={listPageMove} isActive={location.pathname === '/listpage'}>
          칭구 리스트
        </ListTextBox>
      </ListBox>
      <MissionBox isActive={location.pathname === '/missionpage'}>
        <MissionTextBox onClick={missionPageMove} isActive={location.pathname === '/missionpage'}>
          미션
        </MissionTextBox>
      </MissionBox>
    </NavBox>
  )
}
const NavBox = styled.div`
  width: calc(100vw - 1456px);
  display: flex;
  height: 52px;
  align-items: center;
  padding: 4px 726px 0px 730px;
  justify-content: center;
  gap: 200px;
`

const ListBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 131px;
  height: 49px;

  border-bottom: ${({ isActive }) => (isActive ? '2px solid #69535f' : 'none')};
`
const MissionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85px;
  height: 48px;

  border-bottom: ${({ isActive }) => (isActive ? '2px solid #69535f' : 'none')};
`
const ListTextBox = styled.div`
  width: 90px;
  height: 48px;
  color: #404040;
  text-align: center;
  font-family: LINE Seed Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${({ isActive }) => (isActive ? '#404040' : '#a0a0a0')};
  cursor: pointer;
  text-decoration: none;
  margin-top: 20px;
`

const MissionTextBox = styled.div`
  width: 90px;
  height: 48px;
  color: #404040;
  text-align: center;
  font-family: LINE Seed Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${({ isActive }) => (isActive ? '#404040' : '#a0a0a0')};
  cursor: pointer;
  text-decoration: none;
  margin-top: 20px;
`
