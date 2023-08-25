import React from 'react'
import { styled } from 'styled-components'
import Slide from '../components/Slide'
import { useNavigate } from 'react-router-dom'

interface UserData {
  proFile: string
  nickName: string
}

function Main() {
  const userData: UserData[] = [
    {
      proFile: 'text',
      nickName: 'hong',
    },
    {
      proFile: 'text2',
      nickName: 'hong2',
    },
    {
      proFile: 'text3',
      nickName: 'hong3',
    },
    {
      proFile: 'text4',
      nickName: 'hong4',
    },
    {
      proFile: 'text5',
      nickName: 'hong5',
    },
    {
      proFile: 'text6',
      nickName: 'hong6',
    },
    {
      proFile: 'text7',
      nickName: 'hong7',
    },
    {
      proFile: 'text8',
      nickName: 'hong8',
    },
    {
      proFile: 'text9',
      nickName: 'hong9',
    },
    {
      proFile: 'text10',
      nickName: 'hong10',
    },
  ]
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
        <SiteInfo>
          <Slide />
        </SiteInfo>
        <RankInfo>
          <RankTitleBox>이번 달도 잘 했어</RankTitleBox>
          <RankUserBox>
            <div style={{ height: '210px', backgroundColor: 'none', zIndex: '50', position: 'absolute', width: '1440px', display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
              <div
                style={{ height: '210px', zIndex: '50', width: '120px', backgroundColor: 'linear-gradient(to right, to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 0) 100%)' }}
              ></div>
              <LeftBox></LeftBox>
            </div>
            {userData.map((item, index) => {
              return (
                <RankUserInfo key={index}>
                  <RankProFileBox isOdd={index % 2 !== 0}>{item.proFile}</RankProFileBox>
                  <RankNickName>{item.nickName}</RankNickName>
                </RankUserInfo>
              )
            })}
          </RankUserBox>
        </RankInfo>
        <LinkPageBox>
          <ListPageBox onClick={listPageMove}>
            <ListContentBox>
              <ListTitle>칭구 리스트 보러가기</ListTitle>
              <ListContentSpan>나 혼자만 알고 있는 자랑스런 경험이 있나요? 숨겨두지 말고 함께 나눠요.</ListContentSpan>
            </ListContentBox>
          </ListPageBox>
          <MissionPageBox onClick={missionPageMove}>
            <MissionContentBox>
              <MissionTitle>미션 수행 하러가기</MissionTitle>
              <MissionContentSpan>칭찬과 함께 긍정의 경험 나누기 어디서 부터 시작할지 막연하신신가요?</MissionContentSpan>
            </MissionContentBox>
          </MissionPageBox>
        </LinkPageBox>
      </ContentBox>
    </MainBox>
  )
}

export default Main

const LeftBox = styled.div`
  height: 210px;
  background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 0) 100%);
  z-index: 50;
  width: 120px;
`

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
  width: 1440px;
  height: 949px;
`
const SiteInfo = styled.div`
  height: 25rem;
  background-color: #f4f1e9;
`

const RankInfo = styled.div`
  margin-top: 56px;
  width: 100%;
  height: 271px;
`
const RankTitleBox = styled.div`
  font-size: 28px;
  color: #404040;
  font-weight: bold;
  width: 100%;
`
const RankUserBox = styled.div`
  height: 210px;
  border: 1px solid #d9d9d9;
  margin-top: 16px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
`

const RankUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 134px;
  flex-direction: column;
`

const RankProFileBox = styled.div<{ isOdd: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  border-radius: 50%;
  margin-right: 8px;
  border: 4px solid ${(props) => (props.isOdd ? '#F6B000' : '#D9876D')};
`

const RankNickName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
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
  align-items: center;
  width: 704px;
  height: 240px;
  background-color: #feedcd;
  border-radius: 20px;
`
const ListContentBox = styled.div`
  margin-left: 70px;
  display: flex;
  flex-direction: column;
`

const ListTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 108px;
  font-size: 28px;
  font-weight: bold;
  color: #404040;
  font-family: 'LINE Seed Sans KR';
`
const ListContentSpan = styled.span`
  width: 370px;
  height: 56px;
  margin-top: 20px;
  font-size: 20px;
  color: #404040;
  font-weight: 500;
  font-family: 'Pretendard';
`
const MissionPageBox = styled.div`
  display: flex;
  align-items: center;
  width: 704px;
  height: 240px;
  border-radius: 20px;
  background-color: #f5f6cd;
`

const MissionContentBox = styled.div`
  width: 380px;
  height: 56px;
  margin-left: 70px;
  display: flex;
  flex-direction: column;
`

const MissionTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 211px;
  height: 37px;
  font-size: 28px;
  font-weight: bold;
  color: #404040;
  font-family: 'LINE Seed Sans KR';
  gap: 15px 0;
`
const MissionContentSpan = styled.span`
  width: 380px;
  height: 56px;
  font-size: 20px;
  color: #404040;
  font-family: 'Pretendard';
  font-weight: 500;
`
