import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useParams } from 'react-router-dom'

function Detail() {
  const [data, setData] = useState([])
  const { id } = useParams()

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
                <EditButton>수정</EditButton>
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
  border: 1px solid black;
`

const HeaderBox = styled.div`
  display: flex;
  padding: 0px 270px;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
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
  border: 1px solid black;
`

const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  border: 1px solid black;
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

const EditButton = styled.button`
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
`

const ContentBodyBox = styled.div`
  display: flex;
  /* width: 1440px; */
  padding: 0px 270px;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
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
  border: 1px solid black;
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
