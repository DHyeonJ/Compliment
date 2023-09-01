import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Slide from '../components/Slide'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore' // query 함수 불러오기 추가
import { db, auth } from '../firebase.js'
import defaultProfileImage from '../img/user.png'

interface Images {
  id: string
  image: string
  nickname: string
}

function Main() {
  const [images, setImages] = useState<Images[]>([])
  useEffect(() => {
    // 'lists' 컬렉션에서 칭찬순으로 상위 10개의 데이터 가져오기
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, 'lists'),
          orderBy('likes', 'desc'), // 'likes' 필드를 내림차순으로 정렬
          limit(10), // 상위 10개의 문서만 가져오기
        )

        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().photoUrl,
          nickname: doc.data().nickname,
        }))
        setImages(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData()
  }, [])

  const navigator = useNavigate()

  const listPageMove = () => {
    navigator('/listpage')
  }

  const missionPageMove = () => {
    navigator('/missionpage')
  }
  return (
    <MainBox>
      <ContentBox>
        <Slide />
        <RankInfo>
          <RankTitleBox>이번 달도 잘 했어</RankTitleBox>
          <RankUserBox>
            {images.map((item, index) => {
              console.log(item)
              return (
                <RankUserInfo key={item.id}>
                  <RankProFileBox isOdd={index % 2 !== 0} src={item.image ?? defaultProfileImage}></RankProFileBox>
                  {/* <RankNickName>{item.useId}</RankNickName> */}
                </RankUserInfo>
              )
            })}
          </RankUserBox>
        </RankInfo>
        <LinkPageBox>
          <ListPageBox onClick={listPageMove}>
            <ListTitle>칭구 리스트 보러가기</ListTitle>
            <ListContentSpan>
              나 혼자만 알고 있는 자랑스런 경험이 있나요?
              <br /> 숨겨두지 말고 함께 나눠요.
            </ListContentSpan>
          </ListPageBox>
          <MissionPageBox onClick={missionPageMove}>
            <MissionContentBox>
              <MissionTitle>미션 수행 하러가기</MissionTitle>
              <MissionContentSpan>
                칭찬과 함께 긍정의 경험 나누기
                <br /> 어디서 부터 시작할지 막연하신신가요?
              </MissionContentSpan>
            </MissionContentBox>
          </MissionPageBox>
        </LinkPageBox>
      </ContentBox>
    </MainBox>
  )
}
export default Main

const MainBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 1101px;
`
const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* width: 1440px;
  height: 328px; */
`

const RankInfo = styled.div`
  margin-top: 56px;
  height: 271px;
`
const RankTitleBox = styled.div`
  font-size: 28px;
  color: #404040;
  font-weight: bold;
`
const RankUserBox = styled.div`
  height: 210px;
  border: 1px solid #d9d9d9;
  margin-top: 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const RankUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 134px;
  flex-direction: column;
`

const RankProFileBox = styled.img<{ isOdd: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  border-radius: 50%;
  border: 4px solid ${(props) => (props.isOdd ? '#F6B000' : '#D9876D')};
`

const RankNickName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 17px;
  margin-top: 12px;
  font-size: 14px;
  color: #000000;
`
const LinkPageBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 56px;
  gap: 32px;
`

const ListPageBox = styled.div`
  display: flex;
  padding: 44px 280px 88px 44px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  flex: 1 0 0;
  border-radius: 20px;
  background: #feedcd;
  box-shadow: 5px 5px 5px -5px #333;
`

const ListTitle = styled.h2`
  color: var(--text01_404040, #404040);
  font-family: LINE Seed Sans KR;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const ListContentSpan = styled.span`
  width: 380px;
  color: var(--text01_404040, #404040);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 140% */
`
const MissionPageBox = styled.div`
  display: flex;
  align-items: center;
  width: 704px;
  height: 240px;
  border-radius: 20px;
  background-color: #f5f6cd;
  box-shadow: 5px 5px 5px -5px #333;
`

const MissionContentBox = styled.div`
  display: flex;
  padding: 44px 280px 88px 44px;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  flex: 1 0 0;
  border-radius: 20px;
  background: #f5f6cd;
`

const MissionTitle = styled.h2`
  width: 281px;
  color: var(--text01_404040, #404040);
  font-family: LINE Seed Sans KR;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const MissionContentSpan = styled.span`
  width: 380px;
  color: var(--text01_404040, #404040);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 140% */
`
