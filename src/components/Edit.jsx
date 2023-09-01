import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { collection, getDoc, doc, updateDoc } from 'firebase/firestore'
import { db, useAuth, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

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

  const handleEdit = () => {
    // Firestore 문서 업데이트
    const docRef = doc(db, 'lists', id)

    updateDoc(docRef, {
      title: title,
      comments: content,
      imageUrl: imgUrl, // 이미지 URL을 업데이트합니다.
    })
      .then(() => {
        // 수정 성공 후 상세 페이지로 이동
        navigate(`/detail/${id}`)
      })
      .catch((error) => {
        console.error('Error updating document:', error)
        // 에러 처리 추가
      })
  }

  return (
    <ContainerBox>
      <Container>
        {/* 제목 부분 */}
        <div>
          <ListContainerBox>
            <TitleContainerBox>
              <TitleContainer value={title} onChange={(e) => setTitle(e.target.value)} />
            </TitleContainerBox>
          </ListContainerBox>
        </div>

        {/* 본문 부분 */}
        <div>
          <CommentContainerBox>
            <div>
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
                <CancelAndAdd>
                  <Cancel onClick={() => navigate(`/detail/${id}`)}>취소</Cancel>
                  <EditList onClick={handleEdit}>수정</EditList>
                </CancelAndAdd>
              </div>
            </ButtonsBox>
          </CommentContainerBox>
        </div>
      </Container>
    </ContainerBox>
  )
}

export default Edit

const CancelAndAdd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 16px;
`

const EditList = styled.div`
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
