import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { getDocs, collection, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore'
import { db, useAuth, auth } from '../firebase'
import { useParams, useNavigate } from 'react-router-dom'
import defaultProfileImage from '../img/user.png'

function Detail() {
  const [data, setData] = useState(null)
  const { id } = useParams()
  const auth = useAuth()
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)
  const admin = 'admin@admin.com'

  // 좋아요 상태 초기화를 위한 useEffect
  useEffect(() => {
    // 사용자가 로그인한 경우에만 좋아요 상태 초기화
    if (auth.currentUser) {
      const userId = auth.currentUser.uid
      const itemId = id
      const checkLikedStatus = async () => {
        try {
          const itemDoc = doc(db, 'lists', itemId)
          const itemData = (await getDoc(itemDoc)).data()
          // 사용자가 이미 좋아요를 눌렀는지 확인
          const userLiked = itemData.likes.includes(userId)
          setIsLiked(userLiked)
          fetchData() // 좋아요 개수 설정
        } catch (error) {
          console.error('좋아요 상태 초기화 중 오류:', error)
        }
      }
      checkLikedStatus()
    }
  }, [auth.currentUser, id])

  // 좋아요 기능
  const toggleLike = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid
      const itemId = id
      try {
        const itemDoc = doc(db, 'lists', itemId)
        const itemData = (await getDoc(itemDoc)).data()

        // 좋아요 개수를 변경합니다.
        const newLikesCount = itemData.likes + (isLiked ? -1 : 1)

        // Firestore 문서 업데이트
        await updateDoc(itemDoc, {
          likes: newLikesCount,
        })

        fetchData() // 좋아요 수를 업데이트
        setIsLiked((prevIsLiked) => !prevIsLiked)
      } catch (error) {
        console.error('좋아요 토글 중 오류:', error)
      }
    } else {
      alert('이 항목을 좋아하려면 로그인하세요.')
    }
  }

  const handleLikeButtonClick = async () => {
    await toggleLike()
  }

  const fetchData = async () => {
    try {
      const docRef = doc(db, 'lists', id)
      const docSnap = await getDoc(docRef)
      console.log(docSnap.data())
      setData(docSnap.data())
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const detailItem = data

  useEffect(() => {
    // Firestore에서 데이터 가져오기

    fetchData()
  }, [id])

  // 삭제 기능
  const handleDelete = async () => {
    if (auth.currentUser && (auth.currentUser.email === detailItem.userEmail || auth.currentUser.email === admin)) {
      try {
        await deleteDoc(doc(db, 'lists', id))
        console.log('문서가 성공적으로 삭제되었습니다!')
        // 삭제 후 추가적인 정리 작업 또는 네비게이션 로직을 처리합니다.
        navigate('/listpage') // 삭제 후에 /listpage로 이동
      } catch (error) {
        console.error('문서 삭제 중 오류: ', error)
      }
    } else {
      alert('이 게시물을 삭제할 권한이 없습니다.')
    }
  }
  const handleDeleteClick = () => {
    const shouldDelete = window.confirm('정말로 이 게시물을 삭제하시겠습니까?')
    if (shouldDelete) {
      handleDelete().catch((error) => {
        console.error('오류 발생: ', error)
      })
    }
  }

  // 수정 페이지 이동
  const handleEditMove = () => {
    if (auth.currentUser && (auth.currentUser.email === detailItem.userEmail || auth.currentUser.email === admin)) {
      navigate(`/editboard/${detailItem.id}`)
    } else {
      alert('게시물을 수정할 권한이 없습니다.')
    }
  }
  // 게시물을 작성한 이메일과 로그인한 사용자의 이메일이 같은 경우에만 수정과 삭제 버튼을 보여줍니다.
  const renderEditDeleteButtons = () => {
    if (auth.currentUser && (auth.currentUser.email === detailItem.userEmail || auth.currentUser.email === admin)) {
      return (
        <ButtonBox>
          <Button onClick={handleEditMove}>수정</Button>
          <Button onClick={handleDeleteClick}>삭제</Button>
        </ButtonBox>
      )
    }
    return null
  }

  return (
    <>
      {data && (
        <DetailContentsBox key={detailItem.id}>
          {/* 제목과 작성자 정보 */}
          <HeaderBox>
            <HeaderContentBox>
              <TitleBox>{detailItem.title}</TitleBox>
              <MidleTitleBox>
                <UserBox>
                  <UserImg src={detailItem.photoURL ?? defaultProfileImage} alt="" />
                  <UserName>{detailItem.userEmail}</UserName>
                  <DateBox>작성일 {detailItem.Date}</DateBox>
                </UserBox>
                {renderEditDeleteButtons()}
              </MidleTitleBox>
            </HeaderContentBox>
          </HeaderBox>
          {/* 내용과 이미지 */}
          <ContentBodyBox>
            <ContentImgBox src={detailItem.image} alt="" />
            <BodyContent>{detailItem.comments}</BodyContent>
          </ContentBodyBox>
          {/* "좋아요" 버튼 추가 */}
          <Button onClick={handleLikeButtonClick}>{isLiked ? '좋아요 취소' : '좋아요'}</Button>
          <span>{data ? data.likes : 0}</span>
          {/* 댓글 영역 */}
          <CommentAreaBox>
            <CommentHeaderBox>칭찬 댓글 4</CommentHeaderBox>
            <CommentBox>
              <CommentBodyBox>
                <UserBox>
                  <UserImg src="" alt="" />
                  <UserName>유저네임</UserName>
                </UserBox>
                칭찬댓글
                <DateBox>작성일 {detailItem.Date}</DateBox>
              </CommentBodyBox>
            </CommentBox>
            <CommentInputAreaBox>
              <CommentInputMedleBox>
                <UserBox>
                  <UserImg src="" alt="" />
                  <UserName>{detailItem.userEmail}</UserName>
                </UserBox>
                <CommentInputBox />
                <ButtonBox>
                  <Button>등록</Button>
                </ButtonBox>
              </CommentInputMedleBox>
            </CommentInputAreaBox>
          </CommentAreaBox>
        </DetailContentsBox>
      )}
    </>
  )
}
export default Detail

const DetailContentsBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin, padding */
  margin: 0rem 15rem 3rem;
  /* background 관련 */
  background: #fff;
  /* width: 1440px; */
  /* height: 2068px; */
  /* border: 1px solid black; */
`
const HeaderBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin, padding */
  padding: 0 16.875rem;
  /* border: 1px solid black; */
`
const HeaderContentBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5rem;
  /* size 관련 */
  width: 57rem;
  /* margin, padding */
  padding: 0 1.5rem;
  margin: 3rem 0;
`
const TitleBox = styled.div`
  /* display 관련 */
  align-self: stretch;
  /* border 관련 */
  line-height: normal;
  /* font 관련 */
  color: #404040;
  font-family: LINE Seed Sans KR;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 400;
`
const MidleTitleBox = styled.div`
  /* display 관련 */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  /* size 관련 */
  height: 2.25rem;
  /* border: 1px solid black; */
`
const UserBox = styled.div`
  /* display 관련 */
  display: flex;
  align-items: center;
  gap: 1.5rem;
  /* border: 1px solid black; */
`
const UserImg = styled.img`
  /* size 관련 */
  width: 2.25rem;
  height: 2.25rem;
`
const UserName = styled.div`
  /* border 관련 */
  margin-right: 1.5rem;
  /* border 관련 */
  line-height: 1.75rem;
  border-radius: 50%;
  /* font 관련 */
  color: var(--text01_404040, #404040);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
`
const DateBox = styled.div`
  /* border 관련 */
  line-height: 1.75rem;
  /* font 관련 */
  color: var(--text01_404040, #404040);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
`
const ButtonBox = styled.div`
  /* display 관련 */
  display: flex;
  gap: 1rem;
`
const Button = styled.button`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* size 관련 */
  width: 6rem;
  height: 2.25rem;
  /* background 관련 */
  background: #fff;
  /* border 관련 */
  border-radius: 0.5rem;
  border: 1px solid #d9d9d9;
  /* animation 관련 */
  cursor: pointer;
`
const ContentBodyBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin, padding */
  padding: 0 16.875rem;
  /* width: 1440px; */
  /* border: 1px solid black; */
`
const ContentImgBox = styled.img`
  /* size 관련 */
  width: 60.8125rem;
  height: 32rem;
`
const BodyContent = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  /* size 관련 */
  width: 57rem;
  /* margin, padding */
  padding: 1rem 1.5rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
`
const CommentAreaBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin, padding */
  padding: 0 16.875rem;
  /* width: 1440px; */
  /* border: 1px solid black; */
`
const CommentHeaderBox = styled.div`
  /* display 관련 */
  display: flex;
  align-items: center;
  gap: 1rem;
  /* size 관련 */
  width: 57rem;
  /* margin, padding */
  padding: 1.5rem;
  /* border 관련 */
  line-height: 1.375rem;
  /* font 관련 */
  color: #404040;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
`
const CommentBox = styled.div`
  /* display 관련 */
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  align-self: stretch;
  /* size 관련 */
  width: 57rem;
  min-width: 50rem;
  max-width: 90rem;
  /* margin, padding */
  padding: 1rem 1.5rem;
`
const CommentBodyBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
`
const CommentInputAreaBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  /* size 관련 */
  width: 57rem;
  /* margin, padding */
  padding: 1rem;
  /* background 관련 */
  background: #fff;
  /* border 관련 */
  border-radius: 0.5rem;
  border: 1px solid #d9d9d9;
`
const CommentInputMedleBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  /* size 관련 */
  min-width: 50rem;
  max-width: 90rem;
  /* margin, padding */
  padding: 1rem 1.5rem;
`
const CommentInputBox = styled.input`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  flex: 1 0 0;
  /* size 관련 */
  min-width: 35rem;
  max-width: 74.625rem;
  /* margin, padding */
  padding: 1.5rem 0;
`
