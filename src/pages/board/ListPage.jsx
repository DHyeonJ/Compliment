import React, { useState, useEffect } from 'react'
import MenuNav from '../../components/MenuNav'
import Lists from '../../components/Lists'
import { styled } from 'styled-components'
import Search from '../../components/Search'
import { faPlus, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { getLists } from '../../api/ListsApi'
import { useQuery } from 'react-query'

function ListPage() {
  const navigate = useNavigate()
  const { data: listsData, isLoading } = useQuery('lists', getLists)
  const [showButtons, setShowButtons] = useState('')

  // 칭찬순, 최신순이 active할 때를 만들어주는 state
  const [activeSort, setActiveSort] = useState('latest')

  // 검색기능
  const [searchTerm, setSearchTerm] = useState(listsData)

  // state 하나로 관리
  const [displayData, setDisplayData] = useState()

  //
  const searchFiltered = (keyword) => {
    if (keyword.trim() === '') {
      setDisplayData([])
    } else {
      const filtered = listsData ? listsData.filter((item) => item.comments.toLowerCase().includes(keyword.toLowerCase())) : []
      setDisplayData(filtered)
    }
  }

  const handleSearchClick = (value) => {
    setSearchTerm(value)
    searchFiltered(value)
  }

  const createBoardPageMove = () => {
    navigate('/addboard')
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const likesSort = () => {
    setActiveSort('likes')
    const likesData = [...listsData]?.sort((a, b) => b.likes - a.likes)
    setDisplayData(likesData)
  }

  const latestSort = () => {
    setActiveSort('latest')
    const orderedData = [...listsData]?.sort((a, b) => Date.parse(b.time) - Date.parse(a.time))
    setDisplayData(orderedData)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      setShowButtons(scrollPosition > windowHeight / 2 && scrollPosition + windowHeight < documentHeight - 200)
      return () => window.removeEventListener('scroll', handleScroll)
    }

    window.addEventListener('scroll', handleScroll)

    if (listsData) {
      latestSort()
    }
  }, [listsData])

  if (isLoading) {
    return <div>is Loading...</div>
  }

  return (
    <ListPageBox>
      <MenuNav />
      <ListBox>
        <ContentBox>
          <BannerBox>
            {/* <BannerDataBox> */}
            <BannerTitleSpan>칭찬을 구해요</BannerTitleSpan>
            <BannerContentBox>
              오늘 하루는 모두에게 어떤 일이 있었을까요?
              <br />
              일상 속의 자랑스럽고 소중한 순간들을 함께 나눠요.
            </BannerContentBox>
            {/* </BannerDataBox> */}
          </BannerBox>
          <ChoiceBox>
            <FilterBox>
              <NewSpan onClick={latestSort} active={displayData === 'latest'}>
                최신순
              </NewSpan>
              <BlockBox />
              <RankingSpan onClick={likesSort} active={displayData === 'likes'}>
                칭찬순
              </RankingSpan>
            </FilterBox>
            <Search handleSearchClick={handleSearchClick} />
          </ChoiceBox>
          <Lists data={displayData} />
        </ContentBox>
      </ListBox>
      <button
        onClick={() => {
          navigate(`/addboard`)
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M6 16.2H30V19.2H6V16.2Z" fill="#69535F" />
          <path d="M16.5 30L16.5 6L19.5 6V30H16.5Z" fill="#69535F" />
        </svg>
      </button>

      {/* 
      <ButtonBox>
        <PlusButtonBox>
          <PlusButton icon={faPlus} onClick={createBoardPageMove} />
        </PlusButtonBox>
        <TopButtonBox>
          <TopButton icon={faArrowUp} onClick={scrollToTop} />
        </TopButtonBox>
      </ButtonBox> */}
    </ListPageBox>
  )
}

export default ListPage

const ListPageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 2332px;
  flex-direction: column;
  border: 1px solid red;
`

const ListBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100vw - 120px);
  /* width: 1920px; */
  height: 2238px;
  border: 1px solid blue;
`

const ContentBox = styled.div`
  width: 1520px;
  height: 2100px;
  /* width: calc(100vw - 120px); */
  flex-direction: column;
  /* :hover {
    background: rgba(105, 83, 95, 0.2);
  } */
  gap: 42px 0;
`
const BannerBox = styled.div`
  display: flex;
  width: 1440px;
  padding: 48px 56px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  background: #fffaec;
`
const ChoiceBox = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 64px;
  margin-bottom: 64px;
  width: 100%;
  height: 50px; */
  display: flex;
  width: 1440px;
  padding-left: 0px;
  justify-content: space-between;
  align-items: center;
  margin-top: 88px;
  margin-bottom: 34px;
`

const FilterBox = styled.div`
  display: flex;
  gap: 34px;
  margin-left: 70px;
`

const NewSpan = styled.span`
  color: ${(props) => (props.active ? '#69535f' : '#797979')};
  font-weight: ${(props) => (props.active ? '700' : '400')};
  /* color: #69535f;
  font-family: 'LINE Seed Sans KR';
  font-size: 20px;
  font-weight: 400;
  cursor: pointer; */
  display: flex;
  width: 144px;
  justify-content: center;
  align-items: center;
  &:hover {
    /* color: #69535f; */
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

  /* color: #797979;
  font-family: 'LINE Seed Sans KR';
  font-size: 20px;
  font-weight: 400;
  cursor: pointer; */
  display: flex;
  width: 144px;
  justify-content: center;
  align-items: center;
  &:hover {
    /* color: #69535f; */
    color: ${(props) => (props.active ? '#69535f' : '#69535f')}; /* 수정된 부분 */
    font-weight: 700;
  }
`

// const BannerDataBox = styled.div`
//   /* width: 483px;
//   height: 152px;
//   margin-left: 72px; */
// `

const BannerTitleSpan = styled.span`
  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const BannerContentBox = styled.span`
  width: 483px;
  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  //
`
const ButtonBox = styled.div`
  position: fixed;
  bottom: 0px;
  right: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 80px;
  height: 176px;
  z-index: 1;
  display: ${(props) => (props.showButtons ? 'flex' : 'none')};
`

const PlusButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f4f1e9;
  border: none;
`
const PlusButton = styled(FontAwesomeIcon)`
  width: 32px;
  height: 32px;
  color: #69535f;
`

const TopButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f4f1e9;
  border: none;
`

const TopButton = styled(FontAwesomeIcon)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #69535f;
  background-color: #f4f1e9;
  border: none;
`
