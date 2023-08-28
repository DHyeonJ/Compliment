import React from 'react'
import { styled } from 'styled-components'
import HandClap from '../img/hand-clap.png'

const Lists = ({ data }) => {
  return (
    <>
      {data?.map((item) => {
        return (
          <List key={item.id}>
            <ListContent>
              <User>
                <UserImg src="" alt="" />
                <span>{item.userName}</span>
              </User>

              <div>
                <ListTitle>{item.title}</ListTitle>
                <ListComments>{item.comments}</ListComments>
                <ListDate>작성일 : {item.time}</ListDate>
              </div>
            </ListContent>

            <HandClapBox>
              <img src={HandClap} alt="HandClap" />
              <span>{item.likes}</span>
            </HandClapBox>

            <div>
              <Thumbnail src="" alt="" />
            </div>
          </List>
        )
      })}
    </>
  )
}

const HandClapBox = styled.div`
  display: flex;
  width: 118px;
  align-items: flex-end;
  gap: 8px;
  align-self: stretch;
`

const List = styled.div`
  display: flex;
  height: 252px;
  border-bottom: 1px solid #d9d9d9;
  padding: 64px;
`
const UserImg = styled.img`
  width: 68px;
  height: 68px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: #d9d9d9;
`

const UserId = styled.span``

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 16px;
  font-family: 'Pretandard';
  font-weight: 600;
`

const ListTitle = styled.h1`
  font-size: 36px;
  font-weight: 400;
  margin-bottom: 24px;
  font-family: 'Line Seed Sans KR';
  margin-bottom: 16px;
`

const ListComments = styled.p`
  height: 56px;
  font-size: 20px;
  font-family: 'Pretandard';
  font-weight: 600;
  margin-bottom: 16px;
`
const ListDate = styled.p`
  font-weight: 600;
  font-size: 20px;
  font-family: 'Pretandard';
`

const ListContent = styled.div`
  display: flex;
  padding: 16px 24px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
`
const HandsIcon = styled.img
const Thumbnail = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 8px;
  background: #d9d9d9;
`

export default Lists
