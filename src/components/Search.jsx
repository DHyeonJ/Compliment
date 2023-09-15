import React, { useState } from 'react'
import { styled } from 'styled-components'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Search = ({ handleSearchClick }) => {
  const [value, setValue] = useState('')

  const handleSearchChange = (event) => {
    setValue(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // 엔터 키가 눌렸을 때 검색 실행
      handleSearchClick(value)
    }
  }
  return (
    <>
      <SearchBox>
        <KeywordInput type="text" placeholder="찾고 싶은 이야기를 검색하세요." value={value} onChange={handleSearchChange} onKeyPress={handleKeyPress} />
        <SearchIcon
          icon={faMagnifyingGlass}
          onClick={() => {
            handleSearchClick(value)
          }}
        />
      </SearchBox>
    </>
  )
}
export default Search

const SearchBox = styled.div`
  display: flex;
  width: 320px;
  padding-left: 0px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  background: #fff;
`
const SearchIcon = styled(FontAwesomeIcon)`
  border-radius: 20px;
  display: flex;
  width: 48px;
  height: 48px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
`
const KeywordInput = styled.input`
  outline: none;
  width: 280px;
  height: 28px;
  border: none;
  font-size: 15px;
  z-index: 1;
  position: relative;
  left: 10px;
  text-align: left;
  margin: auto;
  &::placeholder {
    color: #999999;
    padding-left: 8px;
  }
  &:focus {
    outline: none;
    text-align: left;
  }
`
