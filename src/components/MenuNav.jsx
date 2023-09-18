import React from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

import { auth } from '../firebase.js'
import { needLogin } from './Alert.jsx'

export default function MenuNav() {
  const navigate = useNavigate()

  const listPageMove = () => {
    navigate('/listpage')
  }

  const missionPageMove = () => {
    if (auth.currentUser) {
      navigate('/missionpage')
    } else {
      needLogin()
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
  display: flex;
  gap: 200px;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
  padding-top: 4px;
`

const ListBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 131px;
  height: 51px;

  border-bottom: ${({ isActive }) => (isActive ? '2px solid #69535f' : 'none')};
`
const ListTextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90px;
  height: 48px;

  font-family: LINE Seed Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${({ isActive }) => (isActive ? '#404040' : '#a0a0a0')};
  text-decoration: none;

  cursor: pointer;
`

const MissionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 131px;
  height: 51px;

  border-bottom: ${({ isActive }) => (isActive ? '2px solid #69535f' : 'none')};
`

const MissionTextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90px;
  height: 48px;

  font-family: LINE Seed Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${({ isActive }) => (isActive ? '#404040' : '#a0a0a0')};
  text-decoration: none;

  cursor: pointer;
`
