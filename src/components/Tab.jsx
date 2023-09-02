import React, { useState } from 'react'
import styled from 'styled-components'
import { getLists } from '../api/ListsApi'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

const Tab = () => {
  const navigate = useNavigate()
  const [currentTab, clickTab] = useState(0)
  const menuArr = [{ name: '나의 칭구들' }, { name: '내가 작성한 댓글' }]
  const { data: listsData, isLoading } = useQuery(['lists'], getLists)
  const selectMenuHandler = (index) => {
    clickTab(index)
  }

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
            // 내가 작성한 글 탭인 경우
            <>
              {listsData?.map((post) => {
                console.log(listsData)
                return (
                  <ListsData
                    key={post.id}
                    onClick={() => {
                      navigate(`/detail/${post.id}`)
                    }}
                  >
                    <p>{post.Profile}</p>
                    <p>{post.userEmail}</p>
                    <p>{post.title}</p>
                    <p>{post.comments}</p>
                    <p>작성일자 : {post.Date}</p>
                    <p>칭찬댓글 수 : {post.likes}</p>
                    <img style={{ width: '136px', height: '136px' }} src={post.image} />
                    <p>{post.name}</p>
                  </ListsData>
                )
              })}
            </>
          ) : null}
        </Desc>
      </div>
    </>
  )
}

export default Tab

const TabMenu = styled.ul`
  display: flex;
  padding: 0px 56px;
  justify-content: center;
  align-items: flex-start;
  gap: 36px;
  align-self: stretch;
  background: #fff;

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

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: rgb(255, 255, 255);
    border-bottom: 2px solid #69535f;
    color: rgb(21, 20, 20);
  }

  & div.desc {
    text-align: center;
  }
`

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
