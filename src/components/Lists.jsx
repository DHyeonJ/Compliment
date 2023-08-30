import React from 'react'
import { styled } from 'styled-components'
import HandClap from '../img/hand-clap.png'
import { useNavigate } from 'react-router-dom'

const Lists = ({ data }) => {
  const navigate = useNavigate()
  return (
    <>
      {data?.map((item) => {
        console.log(item)
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
                    <UserImg src="" alt="" />
                    <span>{item.userEmail}</span>
                  </User>

                  <div>
                    <ListTitle>{item.title}</ListTitle>
                    <ListComments>{item.comments}</ListComments>
                  </div>
                </ListContent>

                <HandClapBox>
                  <ListDate>작성일 </ListDate>
                  <Date>{item.Date}</Date>
                  <Img src={HandClap} alt="HandClap" />
                  <Likes>{item.likes}</Likes>
                </HandClapBox>
              </Contents>

              <div>
                <Thumbnail src={item.image} alt="" />
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
  /* display: flex;
  width: 118px;
  align-items: flex-end;
  gap: 8px;
  align-self: stretch; */
  padding-left: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const List = styled.div`
  /* display: flex;
width: 1440px;
height: 204px;
min-width: 800px;
max-width: 1440px;
padding-bottom: 0px;
flex-direction: column;
align-items: flex-start;
gap: 16px;
border-bottom: 1px solid #D9D9D9;
background: #FFF; */
  /* display: flex;
  height: 252px;
  border-bottom: 1px solid #d9d9d9; */
  /* :hover {
    background: rgba(105, 83, 95, 0.2);
  } */
  /* padding: 64px; */
  display: flex;
  min-width: 800px;
  max-width: 1440px;
  padding: 16px 32px;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  margin-bottom: 12px;
  border-bottom: 1.2px solid #d9d9d9;
`
const UserImg = styled.img`
  /* width: 68px;
  height: 68px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: #d9d9d9; */
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  background: url(<path-to-image>), lightgray -7.077px -8.248px / 136.752% 205.106% no-repeat;
  border-radius: 50%;
  margin-right: 8px;
`

const User = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 16px;
  font-family: 'Pretandard';
  font-weight: 600; */
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
  /* font-size: 36px;
  font-weight: 400;
  margin-bottom: 24px;
  font-family: 'Line Seed Sans KR';
  margin-bottom: 16px; */
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
  /* height: 56px;
  font-size: 20px;
  font-family: 'Pretandard';
  font-weight: 600;
  margin-bottom: 16px; */
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
  /* font-weight: 600;
  font-size: 20px;
  font-family: 'Pretandard'; */
  color: #999;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 200% */
`

const ListContent = styled.div`
  /* display: flex;
  padding: 16px 24px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch; */
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
const HandsIcon = styled.img
const Thumbnail = styled.img`
  /* width: 250px;
  height: 250px;
  border-radius: 8px;
  background: #d9d9d9; */
  width: 160px;
  height: 160px;
  border-radius: 8px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat, #d9d9d9;
`

export default Lists
