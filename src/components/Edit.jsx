import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import HandClap from '../img/hand-clap.png'
import { useNavigate } from 'react-router-dom'
import defaultProfileImage from '../../src/img/user.png'
const Lists = ({ data }) => {
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
                <Thumbnail src={item.image} alt="" />
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
  justify-content: space-between;
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
    background: rgba(105, 83, 95, 0.2);
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
  font-family: Pretendard;
  font-size: 1rem; /* px에서 rem으로 변경 */
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
  font-size: 1rem; /* px에서 rem으로 변경 */
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
  text-align: right;
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
    const file = e.target.files[0]
    if (!file) return null

    const storageRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytes(storageRef, file)
    setFileName(file.name)

    // 업로드 작업이 완료되면 이 부분이 실행됩니다.
    uploadTask
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

    updateDoc(docRef, {
      title,
      comments: content,
      imageUrl: imgUrl, // 이미지 URL을 업데이트합니다.
    })
      .then(() => {
        // 수정 성공 후 Detail 페이지로 이동
        navigate(`/detail/${id}`)
      })
      .catch((error) => {
        console.error('Error updating document:', error)
      })
  }

  return (
    <ContainerPageBox>
      <ContainerBox>
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
                <CancelAndAddContainerBox>
                  <CancelContainerBox onClick={() => navigate(`/detail/${id}`)}>취소</CancelContainerBox>
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
  height: 2.75rem; /* px에서 rem으로 변경 */

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

const CommentInputBox = styled.textarea`
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
  gap: 0.625rem; /* px에서 rem으로 변경 */

  /* margin, padding */
  padding: 2rem 15rem 3rem 15rem; /* px에서 rem으로 변경 */

  /* border 관련 */
  border-bottom: 1px solid #999;
`

const ListContainerBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;

  /* size 관련 */
  width: 90rem; /* px에서 rem으로 변경 */

  /* margin, padding */
  padding: 0 16.875rem; /* px에서 rem으로 변경 */
`

const TitleContainer = styled.input`
  /* size 관련 */
  width: 49.25rem; /* px에서 rem으로 변경 */

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

  /* animation 관련 */
  &::placeholder {
    transition: opacity 0.1s ease-in-out;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`