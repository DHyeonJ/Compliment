/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { styled } from 'styled-components'

import Slide from '../components/Slide'

import defaultProfileImage from '../img/anonymous.png'

import { collection, getDocs, orderBy, limit, query, where } from 'firebase/firestore' // query 함수 불러오기 추가
import { db, auth } from '../firebase.js'

import { needLogin } from '../components/Alert'

interface Images {
  userEmail: string
  id: string
  image: string
}

interface Reply {
  userEmail: string
  photoURL?: string
}

function Main() {
  const [images, setImages] = useState<Images[]>([])
  const [topUserList, setTopUserList] = useState<Reply[]>([])
  const combinedUsers: Reply[] = []

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
          image: doc.data().photoURL,
          userEmail: doc.data().userEmail,
        }))

        setImages(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, 'reply'), // 'reply' 컬렉션을 대상으로 쿼리 설정
          orderBy('userEmail', 'desc'), // 'userEmail' 필드를 기준으로 정렬
          limit(10),
        )

        const querySnapshot = await getDocs(q)
        const userEmailCountMap: Record<string, number> = {}
        const topUsers: Reply[] = []

        await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data() as Reply
            const { userEmail } = data
            if (userEmail in userEmailCountMap) {
              userEmailCountMap[userEmail]++
            } else {
              userEmailCountMap[userEmail] = 1
            }
          }),
        )

        const sortedUserEmails = Object.keys(userEmailCountMap).sort((a, b) => userEmailCountMap[b] - userEmailCountMap[a])

        // 가장 갯수가 많은 userEmail의 데이터 가져오기
        await Promise.all(
          sortedUserEmails.slice(0, 10).map(async (topUserEmail) => {
            // 각각의 가장 갯수가 많은 userEmail에 해당하는 문서 가져오기
            const userDataQuerySnapshot = await getDocs(query(collection(db, 'reply'), where('userEmail', '==', topUserEmail)))

            let addedUserData: Reply | null = null

            userDataQuerySnapshot.forEach((doc) => {
              if (!addedUserData) {
                addedUserData = doc.data() as Reply
              }
            })

            if (addedUserData) {
              topUsers.push(addedUserData)
            }
          }),
        )

        setTopUserList(topUsers)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  for (let i = 0; i < Math.max(topUserList.length, images.length); i++) {
    if (i < topUserList.length) {
      combinedUsers.push(topUserList[i])
    }
    if (i < images.length) {
      combinedUsers.push({ userEmail: images[i].userEmail, photoURL: images[i].image })
    }
  }
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing

  const navigate = useNavigate()
  const listPageMove = () => {
    navigate('/listpage')
  }
  const missionPageMove = () => {
    if (auth.currentUser) {
      navigate('/missionpage')
    } else {
      needLogin()
    }
  }

  return (
    <MainBox>
      <ContentBox>
        <Slide />
        <RankInfo>
          <RankTitleBox>Best 칭구 Ranking!</RankTitleBox>
          <SubTitleBox>
            칭찬 <b className="replyRanking">댓글</b>과 <b className="complimentRanking">칭찬</b>을 많이 받은 글에 대한 상위 5명씩 교차로 실시간으로 순위가 산정이 되고 있습니다! 지금 랭킹에 도전해보세요!
          </SubTitleBox>
          <RankUserBox>
            {combinedUsers.slice(0, 10).map((user, index) => {
              const email = user.userEmail
              const localStorageUserId = email?.split('@')[0]
              return (
                <RankUserInfo key={index}>
                  <RankProFileBox isOdd={index % 2 !== 0} src={user.photoURL ?? defaultProfileImage} alt={`image-${index}`}></RankProFileBox>
                  <RankNickName>{localStorageUserId}</RankNickName>
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
            <MissionTitle>미션 수행 하러가기</MissionTitle>
            <MissionContentSpan>
              칭찬과 함께 긍정의 경험 나누기
              <br /> 어디서 부터 시작할지 막연하신가요?
            </MissionContentSpan>
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
  height: 1200px;
`

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 80px;
`

const RankInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  width: 100%;
`
const RankTitleBox = styled.div`
  font-size: 28px;
  color: #404040;
  font-weight: bold;
`
const SubTitleBox = styled.div`
  font-size: 20px;
  color: #404040;
  font-weight: 600;
  font-family: pretendard;

  .replyRanking {
    color: #d9876d;
    font-weight: bold;
  }

  .complimentRanking {
    color: #f6b000;
    font-weight: bold;
  }
`
const RankUserBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin-top: 16px;

  border-radius: 8px;
`
const RankUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 134px;
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

  margin-top: 12px;

  font-size: 14px;
  color: #000;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const LinkPageBox = styled.div`
  display: flex;

  width: 100%;

  @media (max-width: 768px) {
    // 321px ~ 720px
    width: 100%;
    margin: 0 auto;
  }
`
const ListPageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;

  width: 100%;
  height: 264.5px;

  margin-right: 32px;
  padding: 44px;

  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 5px 5px 5px -5px #333;

  background: #feedcd;

  cursor: pointer;
  transition: 0.8s;

  &:hover {
    width: 130%;
  }
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
  color: var(--text01_404040, #404040);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 140% */
`
const MissionPageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  width: 100%;
  height: 264.5px;

  padding: 44px;

  background-color: #f5f6cd;

  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 5px 5px 5px -5px #333;

  cursor: pointer;
  transition: 0.8s;

  &:hover {
    width: 130%;
  }
`
const MissionTitle = styled.h2`
  color: var(--text01_404040, #404040);
  font-family: LINE Seed Sans KR;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const MissionContentSpan = styled.span`
  color: var(--text01_404040, #404040);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px; /* 140% */
`
