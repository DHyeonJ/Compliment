import React, { useState, useEffect, useRef, useCallback } from 'react'
import MenuNav from '../../components/MenuNav'
import Lists from '../../components/Lists'
import { styled } from 'styled-components'
import Search from '../../components/Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { getLists, useIsAuthenticated } from '../../api/ListsApi'
import { useQuery, useInfiniteQuery } from 'react-query'
import moment from 'moment'
import Loading from '../../components/Loading'
import { observe } from 'react-intersection-observer'

function ListPage() {
  const navigate = useNavigate()
  
  const divRef = useRef(null)

  // 실제로 라이브러리에서 제공하는 변수
  const [isLoading, setLoading] = useState(false)
  const [hasNext, setHasNext] = useState(true)

  const [count, setCount] = useState(5)
  const [list, setList] = useState([])

  const fetchDate = useCallback(async () => {
    setLoading(true)

    const { fetchData, totalCount } = await getLists(count)


    if (fetchData.length === totalCount) {
      setHasNext(false)
    } else {
      setHasNext(true)
    }


    setList(fetchData)
    setLoading(false)
  }, [count])


  useEffect(() => {
    fetchDate()
  }, [fetchDate])
  // 라이브러리에서 대체할 수 있는 코드

  useEffect(() => {
    if (!divRef.current) return


    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          setCount((prev) => prev + 5)
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.5 },
    )


    observer.observe(divRef.current)
  }, [])

  const listsData = []

  // const isLoading = false

  // const { data: listsData, isLoading } = useQuery(['lists'], async () => {
  //   const data = await getLists(10)

  //   return data
  // })


  // 사용자가 인증되었는지 확인
  const isAuthenticated = useIsAuthenticated()

  // 칭찬순, 최신순이 active할 때를 만들어주는 state
  const [activeSort, setActiveSort] = useState('latest')

  // 검색기능
  const [searchTerm, setSearchTerm] = useState(listsData)

  // state 하나로 관리
  const [displayData, setDisplayData] = useState([])

  // console.log('listsData!!!!!', listsData)
  //
  const [page, setPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const searchFiltered = (keyword) => {
    if (keyword.trim() === '') {
      setDisplayData(displayData)
    } else {
      const filtered = listsData
      const filteredTime = filtered ? listsData.filter((item) => item.comments.toLowerCase().includes(keyword.toLowerCase())) : []
      setDisplayData(filteredTime)
    }
  }

  const handleSearchClick = (value) => {
    setSearchTerm(value)
    searchFiltered(value)
  }

  const createBoardPageMove = () => {
    if (isAuthenticated) {
      // 사용자가 인증된 경우에만 "글쓰기" 페이지로 이동합니다.
      navigate('/addboard')
    } else {
      // 사용자에게 로그인하도록 메시지를 표시하거나 로그인을 요청할 수도 있습니다.
      alert('로그인 후에 글을 작성할 수 있습니다.')
    }
  }

  const loadMoreData = () => {
    setIsLoadingMore(true)
    // Simulate loading more data for demonstration purposes
    setTimeout(() => {
      if (listsData) {
        const newData = listsData.slice((page - 1) * 10, page * 10)
        setDisplayData((prevData) => [...prevData, ...newData])
        setIsLoadingMore(false)
        setPage(page + 1)
      }
    }, 1000)
  }
  const likesSort = () => {
    setActiveSort('likes')
    const likesData = [...listsData]?.sort((a, b) => b.likes - a.likes)
    setDisplayData(likesData)
  }

  //
  const latestSort = () => {
    setActiveSort('latest')
    const news = [...listsData]
    const orderedData = news?.sort((a, b) => b.timeSort - a.timeSort)

    // console.log('here', orderedData)
    setDisplayData(orderedData)
  }

  // useEffect(() => {
  //   if (listsData) {
  //     latestSort()
  //     setIsLoadingMore(false) // 데이터가 로드되면 isLoading을 false로 설정합니다
  //   }
  // }, [listsData])

  // console.log('listsData', listsData)
  return (
    <>
      {
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
                <Lists data={list} />
{hasNext && (

                  <div style={{ border: '3px solid black', height: '50px' }} ref={divRef}>
                    loading...
                  </div>
                )}
              </ListContainer>
            </ContentBox>
          </ListBox>
        </ListPageBox>
      }
    </>
  )
}

export default ListPage

const ListContainer = styled.div`
  // height: 1660px;
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
  width: 100vw;
  height: 2168px;
  flex-direction: column;
`

const ListBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100vw - 120px);
  height: 2238px;
  margin-top: 16px;
`

const ContentBox = styled.div`
  width: 1520px;
  height: 2100px;
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
  line-height: normal;
`
const BannerContentBox = styled.span`
  width: 483px;
  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`

const PlusButton = styled.div`
  display: flex;
  width: 140px;
  height: 44px;
  padding: 0px 48px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  border-radius: 8px;
  background: #69535f;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`
const SerchPlusAreaBox = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  gap: 16px;
`
