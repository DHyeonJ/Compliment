import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import moment from 'moment'
import { storage, db, auth } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'
const AddBoardCp = () => {
  const user = auth.currentUser
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const fileInput = React.useRef(null)
  const navigate = useNavigate()
  const nowTime = moment().format('YYYY-MM-DD HH:mm')
  const timeSort = Date.now()
  const photoURL = user?.photoURL ?? null

  const MAX_FILE_SIZE_MB = 5

  const mutationAdd = useMutation(
    async (data) => {
      return addDoc(collection(db, 'lists'), data)
    },
    {
      onSuccess: () => {
        navigate('/listpage')
      },
    },
  )

  const handleSaveClick = async () => {
    if (title.trim() === '') {
      alert('제목을 입력해주세요.')
      return
    } else if (content.trim() === '') {
      alert('내용을 입력해주세요.')
      return
    }

    try {
      await mutationAdd.mutateAsync({
        userId: user.uid,
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
    } catch (error) {
      // console.error('Error adding document: ', error)
    }
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleChangeContent = (e) => {
    setContent(e.target.value)
  }

  const handleUploadClick = () => {
    fileInput.current.click()
  }

  const handleChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return null

    // 이미지 크기 체크
    const fileSizeMB = file.size / (1024 * 1024) // 파일 크기를 메가바이트 단위로 변환
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      alert(`이미지 파일 크기는 ${MAX_FILE_SIZE_MB}MB 이하여야 합니다.`)
      return
    }

    const storageRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytes(storageRef, file)
    setFileName(file.name)

    uploadTask
      .then((snapshot) => {
        e.target.value = ''
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
          setImagePreview(downloadURL)
        })
      })
      .catch((error) => {
        console.error('이미지 업로드 오류: ', error)
      })
  }

  const handleNavigateAway = () => {
    if (title.trim() !== '' || content.trim() !== '') {
      Swal.fire({
        title: '작성 중인 글이 있습니다. ',
        text: '정말로 이 페이지를 벗어나시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/listpage')
        }
      })
    } else {
      navigate('/listpage')
    }
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
              <Line></Line>
            </ListContainerBox>
          </div>

          <div>
            <CommentContainerBox>
              <pre>
                <PreviewBox>{imagePreview && <ImagePreview src={imagePreview} alt="이미지 미리 보기" />}</PreviewBox>
                <CommentInputBox
                  placeholder="오늘은 어떤 일이 있었나요? 
어제보다 한 발짝이라도 더 나아갔다면, 그 어떤 이야기든 해주세요.
어떤 일이든 칭찬해드릴 준비가 되어 있습니다."
                  value={content}
                  onChange={handleChangeContent}
                ></CommentInputBox>
              </pre>

              <ButtonsBox>
                <div>
                  <CustomFileInput ref={fileInput} type="file" accept="image/*" onChange={handleChange} />
                  <span>{fileName}</span>
                  <CustomFileInputLabel htmlFor="fileInput" onClick={handleUploadClick}>
                    이미지 업로드
                  </CustomFileInputLabel>
                </div>
                <div>
                  <CancelAndAddBox>
                    <CancelBoxBtn onClick={handleNavigateAway}>취소</CancelBoxBtn>
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.75rem;
  width: 130px;
  height: 2.75rem;
  padding: 0 2rem;
  line-height: 1.375rem;
  background: #69535f;
  border-radius: 0.5rem;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`
const CancelBoxBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.75rem;
  width: 124px;
  height: 2.75rem;
  padding: 0 2rem;
  line-height: 1.375rem;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 0.5rem;
  color: var(--text-01404040, #404040);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.75rem;
  height: 2.75rem;
  width: 9.375rem;
  padding: 0 1.25rem;
  line-height: 1.375rem;
  background: #fff;
  border-radius: 0.5rem;
  border: 1px solid #69535f;
  color: #69535f;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
`

const CustomFileInput = styled.input`
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 15rem 3rem;
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 0.25rem 1rem 0 rgba(0, 0, 0, 0.14);
`

const Line = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  width: 70%;
  height: 1px;
`

const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 2rem 15rem 3rem;
`

const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 57rem;
  height: 3.25rem;
  padding: 0.25rem 1.5rem;
`

const TitleContainerInput = styled.input`
  width: 57rem;
  line-height: normal;
  border: none;
  outline: none;
  color: #181818;
  font-family: LINE Seed Sans KR;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 400;
  padding: 1rem 1.5rem;
  input::placeholder {
    color: #999999;
    font-family: LINE Seed Sans KR;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  &::placeholder {
    transition: opacity 0.1s ease-in-out;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`

const CommentInputBox = styled.textarea`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
  width: 57rem;
  height: 17.75rem;
  padding: 1rem 1.5rem;
  line-height: 1.75rem;
  border: none;
  outline: none;
  resize: none;
  color: #181818;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;

  input::placeholder {
    color: #aaa8a8;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90rem;
  padding: 0 16.875rem;
  margin: 3rem 0;
`

const TitleContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 2rem 15rem 3rem;
`
const ListContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90rem;
  padding: 0 16.875rem;
`
