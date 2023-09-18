import React, { useState, useEffect, useRef, useCallback } from 'react'
import MenuNav from '../../components/MenuNav'
import Lists from '../../components/Lists'
import { styled } from 'styled-components'
import Search from '../../components/Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { getLists, useIsAuthenticated } from '../../api/listsApi'
import { needLogin } from '../../components/Alert'

function ListPage() {
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()

  const [list, setList] = useState([])
  const [displayData, setDisplayData] = useState([])
  const [activeSort, setActiveSort] = useState('latest')

  const fetchDate = useCallback(async () => {
    const fetchData = await getLists()
    setList(fetchData)
  }, [])

  const likesSort = () => {
    setActiveSort('likes')
    const likesData = [...list]?.sort((a, b) => b.likes - a.likes)
    setDisplayData(likesData)
  }

  const latestSort = () => {
    setActiveSort('latest')

    const orderedData = [...list]?.sort((a, b) => b.timeSort - a.timeSort)
    setDisplayData(orderedData)
  }

  const handleSearchClick = (value) => {
    const temp = list.filter((item) => item.comments.toLowerCase().includes(value.toLowerCase()))
    setDisplayData(temp)
  }

  const createBoardPageMove = () => {
    if (isAuthenticated) return navigate('/addboard')
    else needLogin()
  }

  useEffect(() => {
    fetchDate()
  }, [fetchDate])

  useEffect(() => {
    setDisplayData(list)
  }, [list])

  return (
    <ListPageBox>
      <MenuNav />
      <ListBox>
        <ContentBox>
          <BannerBox>
            <BannerTitleSpan>칭찬을 구해요</BannerTitleSpan>
            <BannerContentBox>
              오늘 하루는 모두에게 어떤 일이 있었을까요?
              <br />
              일상 속의 자랑스럽고 소중한 순간들을 함께 나눠요.
            </BannerContentBox>
          </BannerBox>
          <ChoiceBox>
            <FilterBox>
              <NewSpan onClick={latestSort} active={activeSort === 'latest'}>
                최신순
              </NewSpan>
              <BlockBox />
              <RankingSpan onClick={likesSort} active={activeSort === 'likes'}>
                칭찬순
              </RankingSpan>
            </FilterBox>
            <SerchPlusAreaBox>
              <Search handleSearchClick={handleSearchClick} />
              <PlusButton onClick={createBoardPageMove}>글쓰기</PlusButton>
            </SerchPlusAreaBox>
          </ChoiceBox>
          <ListContainer>
            <Lists data={displayData} />
          </ListContainer>
        </ContentBox>
      </ListBox>
    </ListPageBox>
  )
}

export default ListPage

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  overflow-y: auto;
`

const ListPageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const ListBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 16px;
`

const ContentBox = styled.div`
  width: 1200px;
  margin: 0 auto;
  flex-direction: column;
  gap: 42px 0;
`
const BannerBox = styled.div`
  display: flex;
  padding: 48px 56px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  background: #fffaec;
`
const ChoiceBox = styled.div`
  display: flex;
  padding: 0px 32px 0px 24px;
  justify-content: space-between;
  align-items: center;
  margin-top: 48px;
  margin-bottom: 24px;
`

const FilterBox = styled.div`
  display: flex;
  gap: 34px;
`

const NewSpan = styled.span`
  color: ${(props) => (props.active ? '#69535f' : '#797979')};
  font-weight: ${(props) => (props.active ? '700' : '400')};
  display: flex;
  width: 144px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: ${(props) => (props.active ? '#69535f' : '#69535f')}; /* 수정된 부분 */
    font-weight: 700;
  }
`

const BlockBox = styled.div`
  border: 1px solid #8c8c8c;
`

const RankingSpan = styled.span`
  color: ${(props) => (props.active ? '#69535f' : '#797979')};
  font-weight: ${(props) => (props.active ? '700' : '400')};
  cursor: pointer;
  display: flex;
  width: 144px;
  justify-content: center;
  align-items: center;
  &:hover {
    color: ${(props) => (props.active ? '#69535f' : '#69535f')}; /* 수정된 부분 */
    font-weight: 700;
  }
`

const BannerTitleSpan = styled.span`
  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
`
const BannerContentBox = styled.span`
  width: 483px;
  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`

const PlusButton = styled.div`
  display: flex;
  height: 44px;
  padding: 0px 48px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 12px;
  border-radius: 8px;
  background: #69535f;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`
const SerchPlusAreaBox = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  gap: 16px;
`
