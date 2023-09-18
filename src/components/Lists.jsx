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
  const email = localUserid?.email
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
                    <span>{localStorageUserId}</span>
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
  width: 1376px;
`
const Contents = styled.div`
  display: flex;
  min-width: 560px;
  max-width: 1194px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex: 1 0 0;
`
const Likes = styled.span`
  color: #999;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 200% */
`
const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 4px;
  /* filter: grayscale(100%); */
  /* color: black; */
`
const Date = styled.div`
  color: #999;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 200% */
  margin-left: 8px;
  margin-right: 16px;
`
const HandClapBox = styled.div`
  padding-left: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`
const List = styled.div`
  display: flex;
  min-width: 800px;
  max-width: 1440px;
  padding: 16px 32px;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  margin-bottom: 12px;
  border-bottom: 1.2px solid #d9d9d9;
  cursor: pointer;
  &:hover {
    background: rgba(105, 83, 95, 0.2);
  }
`
const UserImg = styled.img`
  height: 32px;
  width: 32px;
  flex-shrink: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  border-radius: 50%;
  margin-right: 8px;
`
const User = styled.div`
  color: var(--text-01404040, #404040);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 175% */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
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
  width: 1000px;
  height: 44px;
  align-self: stretch;
  color: var(--text-01404040, #404040);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
  margin-top: 8px;
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
  line-height: 28px; /* 200% */
`
const ListContent = styled.pre`
  display: flex;
  width: 1192px;
  height: 120px;
  padding: 0px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 20px;
  margin-bottom: 8px;
`
const Thumbnail = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 8px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat, #d9d9d9;
`
export default Lists
