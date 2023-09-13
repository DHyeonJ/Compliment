import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import MenuNav from '../../components/MenuNav'
import { db } from '../../firebase'
import Detail from '../../components/Detail'

function DetailPage() {
  return (
    <DetailPageBox>
      <MenuNav />
      <Detail />
    </DetailPageBox>
  )
}

export default DetailPage

const DetailPageBox = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  background: #fff;
`
