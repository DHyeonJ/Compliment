/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getLists } from '../api/ListsApi'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import HandClap from '../img/hand-clap.png'
//
import { auth, db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
const Tab = () => {
  const navigate = useNavigate()
  const [currentTab, clickTab] = useState(0)
  const menuArr = [{ name: '나의 칭구들' }, { name: '내가 작성한 댓글' }]
  const { data: listsData, isLoading } = useQuery(['lists'], getLists)
​
  const selectMenuHandler = (index) => {
    clickTab(index)
  }
  //
  const user = auth.currentUser
  const userUid = user ? user.uid : null
  const [userData, setUserData] = useState([])
​
  const fetchUserLists = async () => {
    if (userUid) {
      const listsRef = collection(db, 'lists')
      const q = query(listsRef, where('userId', '==', userUid))
      try {
        const querySnapshot = await getDocs(q)
        console.log('querySnapshot', querySnapshot)
        const updatedUserData = []
        querySnapshot.forEach((doc) => {
          const userData = doc.data()
          userData.id = doc.id // "id" 프로퍼티에 문서 ID를 추가
          updatedUserData.push(userData)
        })
        setUserData(updatedUserData)
        return userData
      } catch (error) {
        console.error('Error fetching user data:', error)
        return []
      }
    }
    return []
  }
  console.log('userData', userData)
  useEffect(() => {
    fetchUserLists()
  }, [])
​
  return (
    <>
      <div>
        <TabMenu>
          {menuArr.map((el, index) => (
            <li key={index} className={index === currentTab ? 'submenu focused' : 'submenu'} onClick={() => selectMenuHandler(index)}>
              {el.name}
            </li>
          ))}
        </TabMenu>
        <Desc>
          {currentTab === 0 ? (
            <>
              <ListContentts>
                {userData?.map((item) => {
                  // id값
                  return (
                    <List
                      key={item.userId}
                      onClick={() => {
                        navigate(`/detail/${item.id}`)
                      }}
                    >
                      <ListContentt>
                        <Contents>
                          <ListContent>
                            <User>
                              <UserImg src={item.photoUrl} alt="" />
                              <span>{item.userEmail}</span>
                            </User>
​
                            <div>
                              <ListTitle>{item.title}</ListTitle>
                              <ListComments>{item.comments}</ListComments>
                            </div>
                          </ListContent>
​
                          <HandClapBox>
                            <ListDate>작성일 </ListDate>
                            <Date>{item.Date}</Date>
                            <Img src={HandClap} alt="HandClap" />
                            <Likes>{item.likes}</Likes>
                          </HandClapBox>
                        </Contents>
​
                        <div>
                          <Thumbnail src={item.image} alt="" />
                        </div>
                      </ListContentt>
                    </List>
                  )
                })}
              </ListContentts>
            </>
          ) : null}
        </Desc>
      </div>
    </>
  )
}
​
export default Tab
​
const ListContentts = styled.div`
  width: 100%;
  height: 860px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
​
  &::-webkit-scrollbar-thumb {
    height: 30%;
    background: rgba(153, 153, 153, 0.4);
    border-radius: 20px;
  }
​
  &::-webkit-scrollbar-track {
    background: rgba(153, 153, 153, 0.1);
  }
`
​
const TabMenu = styled.ul`
  display: flex;
  padding: 0px 56px;
  justify-content: center;
  align-items: flex-start;
  gap: 36px;
  align-self: stretch;
  background: #fff;
​
  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    /* justify-content: space-between;
    width: 380px;
    heigth: 30px; */
    width: calc(100% / 3);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
  }
​
  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: rgb(255, 255, 255);
    border-bottom: 2px solid #69535f;
    color: rgb(21, 20, 20);
  }
​
  & div.desc {
    text-align: center;
  }
`
​
const Desc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  width: 880px;
  align-self: stretch;
`
const ListsData = styled.div`
  display: flex;
  padding-bottom: 0px;
  height: 168px;
  width: 880px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  border-bottom: 1px solid #d9d9d9;
  background: #fff;
`
// dfaf
const ListContentt = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
`
​
const Contents = styled.div`
  display: flex;
  min-width: 560px;
  max-width: 1194px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex: 1 0 0;
`
​
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
​
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
​
const HandClapBox = styled.div`
  padding-left: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`
​
const List = styled.div`
  position: relative;
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
  height: 32px;
  flex-shrink: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  border-radius: 50%;
  margin-right: 8px;
`
​
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
​
const ListTitle = styled.h1`
  color: var(--text-01404040, #404040);
  font-family: LINE Seed Sans KR;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
​
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
​
const ListComments = styled.p`
  width: 500px;
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
​
const ListContent = styled.div`
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
  position: absolute;
  right: 10px;
  width: 136px;
  height: 136px;
  border-radius: 8px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat, #d9d9d9;
`