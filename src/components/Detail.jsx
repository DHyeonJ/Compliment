/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore'
import { db, useAuth } from '../firebase'
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import defaultProfileImage from '../img/user.png'
import Reply from './Reply'

function Detail() {
  const [data, setData] = useState(null)
  const { id } = useParams()
  const auth = useAuth()
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
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
          const userLiked = itemData?.likedUser?.includes(userId)
          setIsLiked(userLiked)
          fetchData() // 좋아요 갯수 설정
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

        // 사용자의 UID를 현재 좋아요한 사용자 목록에 추가 또는 제거합니다.
        let updatedLikedUsers = itemData.likedUser || []
        if (isLiked) {
          // 이미 좋아요를 눌렀다면 사용자 UID를 배열에서 제거
          updatedLikedUsers = updatedLikedUsers.filter((userUid) => userUid !== userId)
        } else {
          // 좋아요를 누르지 않았다면 사용자 UID를 배열에 추가
          updatedLikedUsers.push(userId)
        }

        const newLikesCount = itemData.likes + (isLiked ? -1 : 1)
        // Firestore 문서 업데이트
        await updateDoc(itemDoc, {
          likes: newLikesCount,
          likedUser: updatedLikedUsers,
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
    setIsLoading(true) // 데이터를 가져오는 동안 로딩 상태를 true로 설정
    try {
      const docRef = doc(db, 'lists', id)
      const docSnap = await getDoc(docRef)
      console.log(docSnap.data())
      setData(docSnap.data())
      setIsLoading(false) // 데이터를 성공적으로 가져온 후 로딩 상태를 false로 설정
    } catch (error) {
      console.error('데이터 가져오는 중 오류 발생:', error)
      setIsLoading(false) // 오류가 발생한 경우 로딩 상태를 false로 설정
    }
  }
  useEffect(() => {
    // Firestore에서 데이터 가져오기
    fetchData()
  }, [])
  // 삭제 기능
  const handleDelete = async () => {
    if (auth.currentUser && (auth.currentUser.email === data.userEmail || auth.currentUser.email === admin)) {
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
    if (auth.currentUser && (auth.currentUser.email === data.userEmail || auth.currentUser.email === admin)) {
      navigate(`/editboard/${id}`)
    } else {
      alert('게시물을 수정할 권한이 없습니다.')
    }
  }
  // 게시물을 작성한 이메일과 로그인한 사용자의 이메일이 같은 경우에만 수정과 삭제 버튼을 보여줍니다.
  const renderEditDeleteButtons = () => {
    if (!data) {
      // data가 없는 경우에 대한 처리
      return null
    }
    if (auth.currentUser && (auth.currentUser.email === data.userEmail || auth.currentUser.email === admin)) {
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
      {isLoading ? ( // 로딩 중인 경우 로딩 콘텐츠를 렌더링
        <Loading />
      ) : (
        data && (
          <DetailContentsBox key={data.id}>
            {/* 제목과 작성자 정보 */}
            <HeaderBox>
              <HeaderContentBox>
                <TitleBox>{data.title}</TitleBox>
                <MidleTitleBox>
                  <UserBox>
                    <UserImg src={data.photoURL ?? defaultProfileImage} alt="" />
                    <UserName>{data.userEmail}</UserName>
                    <DateBox>작성일 {data.Date}</DateBox>
                  </UserBox>
                  {renderEditDeleteButtons()}
                </MidleTitleBox>
              </HeaderContentBox>
            </HeaderBox>
            {/* 내용과 이미지 */}
            <ContentBodyBox>
              <ContentImgBox>
                <ContentImg src={data.image} alt="" />
              </ContentImgBox>
              <BodyContent>{data.comments}</BodyContent>
            </ContentBodyBox>
            {/* "좋아요" 버튼 추가 */}
            <Button onClick={handleLikeButtonClick}>{isLiked ? '좋아요 취소' : '좋아요'}</Button>
            <span>{data ? data.likes : 0}</span>
            {/* 댓글 영역 */}
            <CommentAreaBox>
              <Reply />
            </CommentAreaBox>
          </DetailContentsBox>
        )
      )}
    </>
  )
}
export default Detail

const ContentImgBox = styled.div`
  width: 900px;
  height: 480px;
`

const DetailContentsBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin, padding */
  margin: 0rem 15rem 3rem;
  /* background 관련 */
  background: #fff;
`
const HeaderBox = styled.div`
  /* display 관련 */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin, padding */
  padding: 0 16.875rem;
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
`
const UserBox = styled.div`
  /* display 관련 */
  display: flex;
  align-items: center;
  gap: 1.5rem;
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
const ContentImg = styled.img`
  /* size 관련 */
  /* width: 60.8125rem;
  height: 32rem; */
  width: 100%;
  height: 100%;
  object-fit: cover;
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
