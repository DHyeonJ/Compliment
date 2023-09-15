import React from 'react'
import styled from 'styled-components'
import LoadingModalSpinner from '../img/spinner_150x75.gif'

const LoadingModal = ({ isOpen }) => {
  return (
    isOpen && (
      <ModalContainerBox>
        <ModalContentBox>
          <p>Loading...</p>
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
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContentBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`
