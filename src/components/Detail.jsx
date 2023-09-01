import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import { db, useAuth } from '../firebase'
import { useParams, useNavigate } from 'react-router-dom'

function Detail() {
  const [data, setData] = useState([])
  const { id } = useParams()
  const auth = useAuth()
  const navigate = useNavigate()

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

    fetchData().catch((error) => {
      console.error('Error in fetchData:', error)
    })
  }, [])

  // 삭제 기능
  const handleDelete = async () => {
    if (auth.currentUser && detailItem.userEmail === auth.currentUser.email) {
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
    if (auth.currentUser && detailItem.userEmail === auth.currentUser.email) {
      navigate(`/editboard/${detailItem.id}`)
    } else {
      alert('게시물을 수정할 권한이 없습니다.')
    }
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
                  <UserImg src="" alt="" />
                  <UserName>{detailItem.userEmail}</UserName>
                  <DateBox>작성일 {detailItem.Date}</DateBox>
                </UserBox>
                <ButtonBox>
                  <Button onClick={handleEditMove}>수정</Button>
                  <Button onClick={handleDeleteClick}>삭제</Button>
                </ButtonBox>
              </MidleTitleBox>
            </HeaderContentBox>
          </HeaderBox>

          {/* 내용과 이미지 */}
          <ContentBodyBox>
            <ContentImgBox src={detailItem.image} alt="" />
            <BodyContent>{detailItem.comments}</BodyContent>
          </ContentBodyBox>

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
