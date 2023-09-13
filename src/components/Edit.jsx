import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { collection, getDoc, doc, updateDoc } from 'firebase/firestore'
import { db, useAuth, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Swal from 'sweetalert2'

function Edit() {
  const navigate = useNavigate()
  const { id } = useParams()
  const auth = useAuth()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [detailItem, setDetailItem] = useState(null)
  const [fileName, setFileName] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const fileInput = React.useRef(null)

  useEffect(() => {
    // Firebase에서 데이터 가져오기
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'lists', id)
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
          setDetailItem(docSnapshot.data())
          setTitle(docSnapshot.data().title)
          setContent(docSnapshot.data().comments)
          setImgUrl(docSnapshot.data().image)
        } else {
          console.log('Document not found!')
        }
      } catch (error) {
        console.error('Error fetching document:', error)
        // 에러 처리 추가
      }
    }

    fetchData()
      .then(() => {
        // fetchData가 성공적으로 끝날 때의 처리
      })
      .catch((error) => {
        console.error('Error during fetchData:', error)
        // fetchData 실행 중에 발생한 에러 처리
      })
  }, [id])

  const handleUploadClick = (e) => {
    fileInput.current.click()
  }

  const handleChange = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (!file) return null

    const storageRef = ref(storage, `files/${file.name}`)
    setFileName(file.name)

    // 업로드 작업이 완료되면 이 부분이 실행됩니다.
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        e.target.value = ''
        // 업로드된 이미지의 다운로드 URL을 가져와 imgUrl 상태를 업데이트합니다.
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        })
      })
      .catch((error) => {
        console.error('Error uploading image:', error)
      })
  }

  const handleEdit = () => {
    // Firestore 문서 업데이트
    const docRef = doc(db, 'lists', id)

    // 업데이트할 데이터를 객체로 생성
    const updatedData = {}
    if (title !== detailItem.title) {
      updatedData.title = title
    }
    if (content !== detailItem.comments) {
      updatedData.comments = content
    }
    if (imgUrl !== detailItem.image) {
      updatedData.image = imgUrl
    }

    // 업데이트할 내용이 있는 경우에만 업데이트 요청
    if (Object.keys(updatedData).length > 0) {
      updateDoc(docRef, updatedData)
        .then(() => {
          // 수정 성공 후 Detail 페이지로 이동
          navigate(`/detail/${id}`)
        })
        .catch((error) => {
          console.error('문서 업데이트 중 오류 발생:', error)
        })
    } else {
      // 변경된 내용이 없는 경우에는 바로 상세 페이지로 이동
      navigate(`/detail/${id}`)
    }
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
    <ContainerPageBox>
      <ContainerBox>
        {/* 제목 부분 */}
        <div>
          <ListContainerBox>
            <TitleContainerBox>
              <TitleContainerInput value={title} onChange={(e) => setTitle(e.target.value)} />
            </TitleContainerBox>
            <Line></Line>
          </ListContainerBox>
        </div>

        {/* 본문 부분 */}
        <div>
          <CommentContainerBox>
            <div>
              <PreviewBox>{imgUrl && <ImagePreview src={imgUrl} alt="이미지 미리 보기" />}</PreviewBox>

              <CommentInputBox value={content} onChange={(e) => setContent(e.target.value)} />
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
                <CancelAndAddContainerBox>
                  <CancelContainerBox onClick={handleNavigateAway}>취소</CancelContainerBox>
                  <EditListContainerBox onClick={handleEdit}>수정</EditListContainerBox>
                </CancelAndAddContainerBox>
              </div>
            </ButtonsBox>
          </CommentContainerBox>
        </div>
      </ContainerBox>
    </ContainerPageBox>
  )
}

export default Edit

const PreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-top: 10px;
`
const CancelAndAddContainerBox = styled.div`
  /* display 관련 */
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 1rem; /* px에서 rem으로 변경 */
`

const EditListContainerBox = styled.div`
  /* position 관련 */

  /* display 관련 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem; /* px에서 rem으로 변경 */

  /* size 관련 */
  height: 2.75rem; /* px에서 rem으로 변경 */

  /* margin, padding */
  padding: 0 1.5rem; /* px에서 rem으로 변경 */

  /* background 관련 */
  background: #69535f;

  /* border 관련 */
  border-radius: 0.5rem; /* px에서 rem으로 변경 */
  line-height: 1.375rem; /* px에서 rem으로 변경 */

  /* font 관련 */
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem; /* px에서 rem으로 변경 */
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
const CancelContainerBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem; /* px에서 rem으로 변경 */

  /* size 관련 */
  height: 2.75rem; /* px에서 rem으로 변경 */

  /* margin, padding */
  padding: 0 1.5rem; /* px에서 rem으로 변경 */

  /* background 관련 */
  background: #fff;

  /* border 관련 */
  border-radius: 0.5rem; /* px에서 rem으로 변경 */
  border: 1px solid #d9d9d9;
  line-height: 1.375rem; /* px에서 rem으로 변경 */

  /* font 관련 */
  color: var(--text-01404040, #404040);
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem; /* px에서 rem으로 변경 */
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem; /* px에서 rem으로 변경 */

  /* size 관련 */
  height: 2.75rem;
  width: 9.375rem;

  /* margin, padding */
  padding: 0 1.25rem; /* px에서 rem으로 변경 */

  /* background 관련 */
  background: #fff;

  /* border 관련 */
  border-radius: 0.5rem; /* px에서 rem으로 변경 */
  border: 1px solid #69535f;
  line-height: 1.375rem; /* px에서 rem으로 변경 */

  /* font 관련 */
  color: #69535f;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem; /* px에서 rem으로 변경 */
  font-style: normal;
  font-weight: 400;

  /* animation 관련 */
  cursor: pointer;
`

const Line = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  width: 70%;
  height: 1px;
`
const CustomFileInput = styled.input`
  /* display 관련 */
  display: none;
`

const ContainerPageBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;

  /* margin, padding */
  margin: 2rem 15rem 3rem; /* px에서 rem으로 변경 */

  /* background 관련 */
  background: #fff;
  /* border 관련 */
  border-radius: 1.25rem; /* px에서 rem으로 변경 */
  box-shadow: 0px 0.25rem 1rem 0px rgba(0, 0, 0, 0.14);
`

const ContainerBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem; /* px에서 rem으로 변경 */

  /* margin, padding */
  padding: 2rem 15rem 3rem 15rem; /* px에서 rem으로 변경 */
`

const ButtonsBox = styled.div`
  /* display 관련 */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  /* size 관련 */
  width: 57rem; /* px에서 rem으로 변경 */
  height: 3.25rem; /* px에서 rem으로 변경 */

  /* margin, padding */
  padding: 0.25rem 1.5rem; /* px에서 rem으로 변경 */
`

const CommentInputBox = styled.pre`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem; /* px에서 rem으로 변경 */
  align-self: stretch;

  /* size 관련 */
  width: 57rem; /* px에서 rem으로 변경 */
  height: 17.75rem; /* px에서 rem으로 변경 */

  /* margin, padding */
  padding: 1rem 1.5rem; /* px에서 rem으로 변경 */
  line-height: 1.75rem; /* px에서 rem으로 변경 */

  /* border 관련 */
  border: none;
  outline: none;
  resize: none;

  /* font 관련 */
  color: #999;
  font-family: Pretendard;
  font-size: 1rem; /* px에서 rem으로 변경 */
  font-style: normal;
  font-weight: 400;
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
  width: 90rem; /* px에서 rem으로 변경 */

  /* margin, padding */
  padding: 0 16.875rem; /* px에서 rem으로 변경 */
  margin: 3rem 0;
`

const TitleContainerBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  /* margin, padding */
  padding: 2rem 15rem 3rem;

  /* border 관련 */
  /* border-bottom: 1px solid #999; */
`

const ListContainerBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;

  /* size 관련 */
  width: 90rem; /* px에서 rem으로 변경 */

  /* margin, padding */
  padding: 0 16.875rem;
`

const TitleContainerInput = styled.input`
  /* size 관련 */
  width: 57rem; /* px에서 rem으로 변경 */

  /* margin, padding */
  line-height: normal;

  /* border 관련 */
  border: none;
  outline: none;

  /* font 관련 */
  color: #999;
  font-family: LINE Seed Sans KR;
  font-size: 2.25rem; /* px에서 rem으로 변경 */
  font-style: normal;
  font-weight: 400;
  padding: 1rem 1.5rem;
  /* animation 관련 */
  &::placeholder {
    transition: opacity 0.1s ease-in-out;
    color: #999999;
    font-family: LINE Seed Sans KR;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`
