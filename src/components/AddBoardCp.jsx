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
  const [imagePreview, setImagePreview] = useState('') // 이미지 미리 보기 URL 추가
  const fileInput = React.useRef(null)
  const navigate = useNavigate()
  const nowTime = moment().format('YYYY-MM-DD HH:mm')
  const timeSort = Date.now()
  const photoURL = user?.photoURL ?? null
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
    console.log()
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
        photoURL,
        timeSort,
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

    uploadTask
      .then((snapshot) => {
        e.target.value = ''
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
          setImagePreview(downloadURL) // 이미지 미리 보기 URL 설정
        })
      })
      .catch((error) => {
        console.error('이미지 업로드 오류: ', error)
      })
  }

  return (
    <>
      <ContainerPageBox>
        <ContainerBox>
          <div>
            <ListContainerBox>
              <TitleContainerBox>
                <TitleContainerInput type="text" value={title} onChange={handleChangeTitle} placeholder="제목을 입력해주세요."></TitleContainerInput>
              </TitleContainerBox>
            </ListContainerBox>
          </div>

          <div>
            <CommentContainerBox>
              <div>
                <PreviewBox>{imagePreview && <ImagePreview src={imagePreview} alt="이미지 미리 보기" />}</PreviewBox>
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
                  <CustomFileInput ref={fileInput} type="file" onChange={handleChange} />
                  <span>{fileName}</span>
                  <CustomFileInputLabel htmlFor="fileInput" onClick={handleUploadClick}>
                    이미지 업로드
                  </CustomFileInputLabel>
                </div>
                <div>
                  <CancelAndAddBox>
                    <CancelBoxBtn
                      onClick={() => {
                        navigate('/listpage')
                      }}
                    >
                      취소
                    </CancelBoxBtn>
                    <AddListBoxBtn
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
                        handleSaveClick()
                      }}
                    >
                      작성하기
                    </AddListBoxBtn>
                  </CancelAndAddBox>
                </div>
              </ButtonsBox>
            </CommentContainerBox>
          </div>
        </ContainerBox>
      </ContainerPageBox>
    </>
  )
}

export default AddBoardCp

const PreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ImagePreview = styled.img`
  /* 디테일 페이지와 동일하게 크기 넣어야하는지 논의 필요 */
  /* width: 900px;
  height: 480px; */
  max-width: 100%;
  max-height: 300px;
  margin-top: 10px;
`
const CancelAndAddBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 1rem; /* 변경 */
`

const AddListBoxBtn = styled.button`
  /* display 관련 */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.75rem; /* 변경 */

  /* size 관련 */
  width: 130px;
  height: 2.75rem; /* 변경 */

  /* margin, padding */
  padding: 0 2rem; /* 변경 */
  line-height: 1.375rem; /* 변경 */

  /* background 관련 */
  background: #69535f;

  /* border 관련 */
  border-radius: 0.5rem; /* 변경 */
  border: none;
  /* font 관련 */
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  /* animation 관련 */
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    /* 호버 스타일 */
    transform: scale(1.02);
  }
`
const CancelBoxBtn = styled.button`
  /* display 관련 */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.75rem; /* 변경 */

  /* size 관련 */
  width: 124px;
  height: 2.75rem;

  /* margin, padding */
  padding: 0 2rem; /* 변경 */
  line-height: 1.375rem; /* 변경 */

  /* background 관련 */
  background: #fff;

  /* border 관련 */
  border: 1px solid #d9d9d9;
  border-radius: 0.5rem; /* 변경 */

  /* font 관련 */
  color: var(--text-01404040, #404040);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  /* animation 관련 */
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

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
  /* display 관련 */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.75rem;

  /* size 관련 */
  height: 2.75rem;

  /* margin, padding */
  padding: 0 1.25rem;
  line-height: 1.375rem;

  /* background 관련 */
  background: #fff;

  /* border 관련 */
  border-radius: 0.5rem;
  border: 1px solid #69535f;

  /* font 관련 */
  color: #69535f;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;

  /* animation 관련 */
  cursor: pointer;
`

const CustomFileInput = styled.input`
  /* display 관련 */
  display: none;
  width: 240px;
  height: 44px;
  padding: 0px 12px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  border-radius: 8px;
  border: 1px solid #999;
  background: #fff;
`

const ContainerPageBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin, padding */
  margin: 2rem 15rem 3rem; /* 변경 */

  /* background 관련 */
  /* background: #fff; */
  background-color: aliceblue;

  /* border 관련 */
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 1rem 0 rgba(0, 0, 0, 0.14);
`

const ContainerBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 2rem 15rem 3rem; /* 변경 */
`

const ButtonsBox = styled.div`
  /* display 관련 */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  /* size 관련 */
  width: 57rem; /* 변경 */
  height: 3.25rem; /* 변경 */

  /* margin, padding */
  padding: 0.25rem 1.5rem; /* 변경 */
`

const TitleContainerInput = styled.input`
  /* size 관련 */
  width: 57rem; /* 변경 */

  /* border 관련 */
  line-height: normal;
  border: none;
  outline: none;

  /* font 관련 */
  color: #999;
  font-family: LINE Seed Sans KR;
  font-size: 2.25rem; /* 변경 */
  font-style: normal;
  font-weight: 400;

  padding: 1rem 1.5rem; /* 변경 */
  input::placeholder {
    color: #999999;
    font-family: LINE Seed Sans KR;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal; /* 원하는 색상으로 변경하세요 */
  }
  /* animation 관련 */
  &::placeholder {
    transition: opacity 0.1s ease-in-out;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`

const CommentInputBox = styled.textarea`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;

  /* size 관련 */
  width: 57rem; /* 변경 */
  height: 17.75rem; /* 변경 */

  /* margin, padding */
  padding: 1rem 1.5rem; /* 변경 */

  /* border 관련 */
  line-height: 1.75rem; /* 변경 */
  border: none;
  outline: none;
  resize: none;

  /* font 관련 */
  color: #999;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;

  input::placeholder {
    color: #999999;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px; /* 175% */ /* 원하는 색상으로 변경하세요 */
  }
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
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;

  /* size 관련 */
  width: 90rem; /* 변경 */

  /* margin, padding */
  padding: 0 16.875rem; /* 변경 */
  margin: 3rem 0; /* 변경 */
`

const TitleContainerBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  /* margin, padding */
  padding: 2rem 15rem 3rem; /* 변경 */

  /* border 관련 */
  border-bottom: 1px solid #999;
`
const ListContainerBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;

  /* size 관련 */
  width: 90rem; /* 변경 */

  /* margin, padding */
  padding: 0 16.875rem; /* 변경 */
`
