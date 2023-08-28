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
  const { data: listsData } = useQuery('lists', getLists)
  const [showButtons, setShowButtons] = useState(false)
  const [sortedData, setSortedData] = useState(listsData)

  // 검색기능
  const [searchTerm, setSearchTerm] = useState('')
  const [searchedData, setSearchedData] = useState([])

  const searchFiltered = (keyword) => {
    if (keyword.trim() === '') {
      setSearchedData([])
    } else {
      const filtered = listsData.filter((item) => item.comments.toLowerCase().includes(keyword.toLowerCase()))
      setSearchedData(filtered)
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
      behavior: 'smooth', // 부드럽게 스크롤 이동
    })
  }

  const likesSort = () => {
    const likesData = [...listsData]?.sort((a, b) => b.likes - a.likes)
    setSortedData(likesData)
  }

  const latestSort = () => {
    const orderedData = [...listsData]?.sort((a, b) => b.time - a.time)
    setSortedData(orderedData)
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
      // setSortedData(listsData)
      latestSort()
    }
  }, [listsData])

  return (
    <ListPageBox>
      <MenuNav />
      <ListBox>
        <ContentBox>
          <BannerBox>
            <BannerDataBox>
              <BannerTitleSpan>칭찬을 구해요</BannerTitleSpan>
              <BannerContentBox>
                오늘 하루는 모두에게 어떤 일이 있었을까요?
                <br />
                일상 속의 자랑스럽고 소중한 순간들을 함께 나눠요.
              </BannerContentBox>
            </BannerDataBox>
          </BannerBox>
          <ChoiceBox>
            <FilterBox>
              <NewSpan onClick={latestSort}>최신순</NewSpan>
              <BlockBox />
              <RankingSpan onClick={likesSort}>칭찬순</RankingSpan>
            </FilterBox>
            <Search handleSearchClick={handleSearchClick} />
          </ChoiceBox>
          {/* <Lists data={searchedData.length > 0 ? searchedData : sortedData} /> */}
          <Lists data={searchedData} />
        </ContentBox>
      </ListBox>
      <ButtonBox showButtons={showButtons}>
        <PlusButtonBox>
          <PlusButton icon={faPlus} onClick={createBoardPageMove} />
        </PlusButtonBox>
        <TopButtonBox>
          <TopButton icon={faArrowUp} onClick={scrollToTop} />
        </TopButtonBox>
      </ButtonBox>
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
  border: 1px solid black;
  /* width: calc(100vw - 120px); */
  flex-direction: column;
  gap: 42px 0;
`
const BannerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;

  width: 1520px;
  height: 272px;
  background-color: #fdf5e5;
  border-radius: 20px;
`
const ChoiceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 64px;
  margin-bottom: 64px;
  width: 100%;
  height: 50px;
`

const FilterBox = styled.div`
  display: flex;
  gap: 34px;
  margin-left: 70px;
`

const NewSpan = styled.span`
  color: #69535f;
  font-family: 'LINE Seed Sans KR';
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
`

const BlockBox = styled.div`
  border: 1px solid #8c8c8c;
`

const RankingSpan = styled.span`
  color: #797979;
  font-family: 'LINE Seed Sans KR';
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
`

const BannerDataBox = styled.div`
  width: 483px;
  height: 152px;
  margin-left: 72px;
`

const BannerTitleSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 265px;
  height: 64px;
  font-size: 48px;
  font-weight: bold;
  font-family: 'LINE SEED SANS KR';
`
const BannerContentBox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 483px;
  height: 72px;
  font-size: 24px;
  font-weight: 400;
  font-family: 'LINE SEED SANS KR';
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
