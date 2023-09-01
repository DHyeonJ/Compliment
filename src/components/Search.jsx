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
      setValue(inputValue)
    }
  }

  return (
    <>
      <SearchBox>
        <SearchIcon
          icon={faMagnifyingGlass}
          onClick={() => {
            handleSearchClick(value)
          }}
        />
        <KeywordInput type="text" placeholder="찾고 싶은 이야기를 검색하세요." value={value} onChange={handleSearchChange} />
      </SearchBox>
    </>
  )
}
export default Search

const SearchBox = styled.div`
  /* width: 400px;
  height: 48px;
  border-radius: 20px;
  border: solid 1px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 70px; */
  display: flex;
  width: 400px;
  padding: 0px 8px;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
`
const SearchIcon = styled(FontAwesomeIcon)`
  width: 32px;
  height: 32px;
  color: #404040;
  margin: 8px;
`
const KeywordInput = styled.input`
  width: 300px;
  height: 28px;
  border: none;
  margin-left: 10px;
  font-size: 15px;
  z-index: 1;
  position: relative;
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
