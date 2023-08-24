import React from 'react'
import { styled } from 'styled-components'

function Main(): JSX.Element {
  return (
    <MainBox>
      <ContentBox>
        <SiteInfo></SiteInfo>
      </ContentBox>
    </MainBox>
  )
}

export default Main

const MainBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 86rem;
`
const ContentBox = styled.div`
  width: 95rem;
  height: 76.4rem;
`
const SiteInfo = styled.div`
  width: 76.4rem;
  height: 25rem;
  background-color: #f4f1e9;
`
