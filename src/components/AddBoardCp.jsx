import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import moment from 'moment'
import { storage, db, auth } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

const AddBoardCp = () => {
  const user = auth.currentUser
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const fileInput = React.useRef(null)
  const navigate = useNavigate()
  const nowTime = moment().format('YYYY-MM-DD')
  const mutationAdd = useMutation(
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (data) => {
      return addDoc(collection(db, 'lists'), data)
    },
    {
      onSuccess: () => {
        navigate('/listpage')
      },
    },
  )
  const handleSaveClick = async (e) => {
    // e.preventDefault()

    if (title.trim() === '') {
      setModalMessage('제목을 입력해주세요.')
      return
    } else if (content.trim() === '') {
      // setModalMessage('내용을 입력해주세요.')
      return
    } else if (fileName.trim() === '') {
      // setModalMessage('업로드할 이미지를 선택해주세요.')
      return
    } else if (imgUrl.trim() === '') {
      // setModalMessage('업로드할 이미지를 선택해주세요.')
      alert('이미지가 없습니다')
      return
    }

    try {
      await mutationAdd.mutateAsync({
        userId: user.uid, // 사용자 ID 추가
        userEmail: user.email,
        title,
        comments: content,
        likes: 0,
        Date: nowTime,
        image: imgUrl,
        fileName,
        photoUrl: imgUrl,
      })
      // setModalMessage('게시물이 작성되었습니다.')
      // setIsModalOpen(true)
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleChangeContent = (e) => {
    setContent(e.target.value)
  }
  const handleUploadClick = (e) => {
    fileInput.current.click()
  }
  const handleChange = (e) => {
    console.log(e.target.files[0])
    e.preventDefault()
    const file = e.target.files
    if (!file) return null

    const storageRef = ref(storage, `files/${file[0].name}`)
    const uploadTask = uploadBytes(storageRef, file[0])
    setFileName(e.target.files[0].name)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    uploadTask.then((snapshot) => {
      e.target.value = ''
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setImgUrl(downloadURL)
      })
    })
  }

  return (
    <>
      <ContainerBox>
        <Container>
          <div>
            <ListContainerBox>
              <TitleContainerBox>
                <TitleContainer type="text" value={title} onChange={handleChangeTitle} placeholder="제목을 입력해주세요."></TitleContainer>
              </TitleContainerBox>
            </ListContainerBox>
          </div>

          <div>
            <CommentContainerBox>
              <div>
                <CommentInputBox
                  placeholder="오늘은 어떤 일이 있었나요? 
어제보다 한 발짝이라도 더 나아갔다면, 그 어떤 이야기든 해주세요.
어떤 일이든 칭찬해드릴 준비가 되어 있습니다."
                  value={content}
                  onChange={handleChangeContent}
                ></CommentInputBox>
              </div>

              <ButtonsBox>
                <div>
                  <CustomFileInputLabel htmlFor="fileInput" onClick={handleUploadClick}>
                    이미지 업로드
                  </CustomFileInputLabel>
                  <CustomFileInput ref={fileInput} type="file" onChange={handleChange} />
                  <span>{fileName}</span>
                </div>
                <div>
                  <CancelAndAdd>
                    <Cancel
                      onClick={() => {
                        navigate('/listpage')
                      }}
                    >
                      취소
                    </Cancel>
                    <AddList
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
                        handleSaveClick()
                      }}
                    >
                      작성하기
                    </AddList>
                  </CancelAndAdd>
                </div>
              </ButtonsBox>
            </CommentContainerBox>
          </div>
        </Container>
      </ContainerBox>
    </>
  )
}

export default AddBoardCp

const CancelAndAdd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 16px;
`

const AddList = styled.div`
  display: flex;
  height: 44px;
  padding: 0px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  background: #69535f;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    /* 호버 스타일 */
    transform: scale(1.02);
  }
`
const Cancel = styled.div`
  cursor: pointer;

  display: flex;
  height: 44px;
  padding: 0px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background: #fff;
  color: var(--text-01404040, #404040);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
  transition: transform 0.3s ease-in-out;

  &:hover {
    /* 호버 스타일 */
    transform: scale(1.02);
  }
`
// const UploadFile = styled.input`
//   display: flex;
//   width: 240px;
//   height: 44px;
//   padding: 0px 12px;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   gap: 12px;
//   border-radius: 8px;
//   border: 1px solid #999;
//   background: #fff;
// `

const CustomFileInputLabel = styled.label`
  display: inline-block;
  padding: 8px 12px;
  background-color: #eee;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  height: 44px;
  padding: 0px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  border: 1px solid #69535f;
  background: #fff;
  color: #69535f;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
`

const CustomFileInput = styled.input`
  display: none;
`

const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.14);
  margin: 32px 240px 48px;
`

const Container = styled.div`
  display: flex;
  padding: 32px 240px 48px 240px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`

const ButtonsBox = styled.div`
  display: flex;
  width: 912px;
  height: 52px;
  padding: 4px 24px;
  justify-content: space-between;
  align-items: flex-start;
`

const CommentInputBox = styled.textarea`
  display: flex;
  width: 912px;
  height: 284px;
  padding: 16px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  color: #999;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 175% */
  border: none;
  outline: none;
  resize: none;
`

// const CommentInput = styled.input`
//   align-self: stretch;
//   color: #999;
//   font-family: Pretendard;
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 28px; /* 175% */
// `

const CommentContainerBox = styled.div`
  display: flex;
  width: 1440px;
  padding: 0px 270px;
  flex-direction: column;
  align-items: center;
  margin: 48px 0;
`

const TitleContainerBox = styled.div`
  display: flex;
  padding: 32px 240px 48px 240px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 1px solid #999;
`
const ListContainerBox = styled.div`
  display: flex;
  width: 1440px;
  padding: 0px 270px;
  flex-direction: column;
  align-items: center;
`
const TitleContainer = styled.input`
  width: 788px;
  color: #999;
  font-family: LINE Seed Sans KR;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  outline: none;
  &::placeholder {
    transition: opacity 0.1s ease-in-out;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`
