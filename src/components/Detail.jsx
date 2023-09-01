import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db, useAuth, auth } from '../firebase'
import { useParams, useNavigate } from 'react-router-dom'
import defaultProfileImage from '../img/user.png'

function Detail() {
  const [data, setData] = useState([])
  const { id } = useParams()
  const auth = useAuth()
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)
  const admin = 'admin@admin.com'
  // 좋아요 기능
  const toggleLike = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid
      const itemId = detailItem.id

      try {
        // Firestore에서 문서 가져오기
        const itemDoc = doc(db, 'lists', itemId)
        const itemData = (await getDoc(itemDoc)).data()

        // 사용자가 이미 "좋아요"를 누른 경우
        if (itemData.likes.includes(userId)) {
          // "좋아요"를 취소하도록 Firestore 문서 업데이트
          await updateDoc(itemDoc, {
            likes: itemData.likes.filter((uid) => uid !== userId),
          })
        } else {
          // 사용자가 아직 "좋아요"를 누르지 않은 경우
          // Firestore 문서 업데이트하여 사용자의 UID를 "likes" 배열에 추가
          await updateDoc(itemDoc, {
            likes: [...itemData.likes, userId],
          })
        }

        // "좋아요" 상태를 토글합니다.
        setIsLiked((prevIsLiked) => !prevIsLiked)
      } catch (error) {
        console.error('좋아요 토글 중 오류:', error)
      }
    } else {
      // 사용자가 인증되지 않았을 경우 처리
      // 예를 들어 로그인 프롬프트를 표시하거나 다르게 처리할 수 있습니다.
      alert('이 항목을 좋아하려면 로그인하세요.')
    }
  }

  const handleLikeButtonClick = async () => {
    await toggleLike()
  }

  //   id 값이 일치하는 데이터만 가져오는 함수
  const getDetailData = (id) => {
    return data.find((item) => item.id === id)
  }

  const detailItem = getDetailData(id)

  useEffect(() => {
    // Firestore에서 데이터 가져오기
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'lists')) // 실제 컬렉션 이름으로 변경
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setData(fetchedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

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
      {data.length > 0 && (
        <DetailContentsBox key={detailItem.id}>
          {/* 제목과 작성자 정보 */}
          <HeaderBox>
            <HeaderContentBox>
              <TitleBox>{detailItem.title}</TitleBox>
              <MidleTitleBox>
                <UserBox>
                  <UserImg src={detailItem.photoUrl ?? defaultProfileImage} alt="" />
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
          <span>{detailItem.likes}</span>

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
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  margin: 32px 240px 48px;
  /* width: 1440px; */
  /* height: 2068px; */
  /* border: 1px solid black; */
`

const HeaderBox = styled.div`
  display: flex;
  padding: 0px 270px;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid black; */
`

const HeaderContentBox = styled.div`
  display: flex;
  width: 912px;
  padding: 0px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  margin: 48px 0px;
`

const TitleBox = styled.div`
  align-self: stretch;
  color: #404040;
  font-family: LINE Seed Sans KR;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const MidleTitleBox = styled.div`
  display: flex;
  height: 36px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  /* border: 1px solid black; */
`

const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  /* border: 1px solid black; */
`

const UserImg = styled.img`
  width: 36px;
  height: 36px;
`

const UserName = styled.div`
  color: var(--text01_404040, #404040);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  margin-right: 24px;
`

const DateBox = styled.div`
  color: var(--text01_404040, #404040);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
`

const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
`

const Button = styled.button`
  display: flex;
  width: 96px;
  height: 36px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* gap: 12px; */
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background: #fff;
  cursor: pointer;
`

const ContentBodyBox = styled.div`
  display: flex;
  /* width: 1440px; */
  padding: 0px 270px;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid black; */
`

const ContentImgBox = styled.img`
  width: 973px;
  height: 512px;
`

const BodyContent = styled.div`
  display: flex;
  width: 912px;
  padding: 16px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 48px;
`

const CommentAreaBox = styled.div`
  display: flex;
  /* width: 1440px; */
  padding: 0px 270px;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid black; */
`

const CommentHeaderBox = styled.div`
  display: flex;
  width: 912px;
  padding: 24px;
  align-items: center;
  gap: 10px;

  color: #404040;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`

const CommentBox = styled.div`
  display: flex;
  min-width: 800px;
  max-width: 1440px;
  padding: 16px 24px;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
`

const CommentBodyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`

const CommentInputAreaBox = styled.div`
  display: flex;
  width: 912px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background: #fff;
`

const CommentInputMedleBox = styled.div`
  display: flex;
  min-width: 800px;
  max-width: 1440px;
  padding: 16px 24px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`

const CommentInputBox = styled.input`
  display: flex;
  min-width: 560px;
  max-width: 1194px;
  padding: 24px 0px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
`
