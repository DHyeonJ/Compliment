import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import HandClap from '../img/hand-clapping.png'
import { useNavigate } from 'react-router-dom'
import LoadingModal from './LoadingModal'
import defaultProfileImage from '../../src/img/user.png'
import defualtContentsImg from '../img/defaultContentImg.png'

const Lists = ({ data }) => {
  const navigate = useNavigate()
  const localUserid = JSON.parse(localStorage.getItem('user'))
  const email = localUserid?.email || ''
  const localStorageUserId = email.split('@')[0]

  return (
    <>
      {data?.map((item) => {
        return (
          <List
            key={item.id}
            onClick={() => {
              navigate(`/detail/${item.id}`)
            }}
          >
            <ListContentt>
              <Contents>
                <ListContent>
                  <User>
                    <UserImg src={item.photoURL ?? defaultProfileImage} alt="" />
                    <span>{item.userEmail.split('@')[0]}</span>
                  </User>
                  <pre>
                    <ListTitle>{item.title}</ListTitle>
                    <ListComments>{item.comments}</ListComments>
                  </pre>
                </ListContent>
                <HandClapBox>
                  <ListDate>작성일 </ListDate>
                  <Date>{item.Date}</Date>
                  <Img src={HandClap} alt="HandClap" />
                  <Likes>{item.likes ? item.likes : 0}</Likes>
                </HandClapBox>
              </Contents>
              <div>
                <Thumbnail src={item.image || defualtContentsImg} alt="" />
              </div>
            </ListContentt>
          </List>
        )
      })}
    </>
  )
}

const ListContentt = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
  /* width: 1376px; */
`
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex: 1 0 0;
  min-width: 560px;
  max-width: 1194px;
`
const Likes = styled.span`
  color: #999;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
`
const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 4px;
`
const Date = styled.div`
  margin-left: 8px;
  margin-right: 16px;
  color: #999;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
`
const HandClapBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 24px;
`
const List = styled.div`
  display: flex;
  align-self: stretch;
  align-items: flex-start;
  gap: 24px;
  min-width: 800px;
  max-width: 1440px;
  padding: 16px 32px;
  margin-bottom: 12px;
  border-bottom: 1.2px solid #d9d9d9;
  cursor: pointer;
  &:hover {
    background: rgba(105, 83, 95, 0.2);
  }
`
const UserImg = styled.img`
  flex-shrink: 0;
  height: 32px;
  width: 32px;
  margin-right: 8px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  border-radius: 50%;
`
const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  color: var(--text-01404040, #404040);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
`
const ListTitle = styled.h1`
  width: 884px;
  color: var(--text-01404040, #404040);
  font-family: LINE Seed Sans KR;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const ListComments = styled.p`
  align-self: stretch;
  width: 1000px;
  height: 44px;
  margin-top: 8px;
  color: var(--text-01404040, #404040);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const ListDate = styled.p`
  color: #999;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
`
const ListContent = styled.pre`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 1192px;
  height: 120px;
  padding: 0px 24px;
  margin-bottom: 8px;
  border-radius: 20px;
`
const Thumbnail = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 8px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat, #d9d9d9;
`
export default Lists
