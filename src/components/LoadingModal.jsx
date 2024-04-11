import React from 'react'

import styled from 'styled-components'

import LoadingModalSpinner from '../img/spinner_150x75.gif'

const LoadingModal = ({ isOpen }) => {
  return (
    isOpen && (
      <ModalContainerBox>
        <ModalContentBox>
          <LoadingP>Loading...</LoadingP>
          <img src={LoadingModalSpinner} />
        </ModalContentBox>
      </ModalContainerBox>
    )
  )
}

export default LoadingModal

const ModalContainerBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);
`

const ModalContentBox = styled.div`
  padding: 20px;

  background: white;

  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  text-align: center;
`

const LoadingP = styled.p`
  font-size: 24px;
  font-weight: bold;
  font-family: LINESeedSansKR;
`
