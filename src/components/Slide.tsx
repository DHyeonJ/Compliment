import React, { useState } from 'react'
import styled from 'styled-components'
import mainBanner1Image from '../img/mainBanner1.png'
import mainBanner2Image from '../img/mainBanner2.png'
import mainBanner3Image from '../img/mainBanner3.png'
import btnSlideLeft from '../img/btn_slide_left.png'
import btnSliderRight from '../img/btn_slide_right.png'

function Slide(): JSX.Element {
  const [activeSlide, setActiveSlide] = useState<number>(0)

  const data = [
    {
      title: '칭찬을 구해요, 칭구',
      middeleTitle: '칭찬에 익숙해지세요.',
      content: '우리는 일상 속에서 자랑스러운 순간들을 늘 경험하고 있습니다. 오늘도 내 소중한 순간들을 그냥 흘려보내고 있지는 않으신가요? 이런 순간들에 대해 때론, 인정과 칭찬이 필요한 법입니다.',
      img: mainBanner1Image,
    },
    {
      title: '긍정 에너지를 함께 나눠요',
      middeleTitle: '나만의 작은 성취에 칭찬을 돌려드려요.',
      content: '나 혼자만 아는 오늘의 작은 성취, 그냥 넘어가지 마세요! 오늘도 생생히 살아있는 서로에게 칭찬 한마디를 남겨주세요. 작지만 사소하지 않은 경험이 모여 내일을 사는 힘이 됩니다.',
      img: mainBanner2Image,
    },
    {
      title: '매일 미션이 도착해요',
      middeleTitle: '칭찬, 어떻게 시작하면 좋을까요?',
      content: '서로 칭찬과 격려를 통해 긍정 에너지를 주고 받으세요. 이 모든 것은 아주 작은 선행으로부터 시작됩니다. 매일 도착하는 미션카드를 통해 영감을 얻을 수 있습니다.',
      img: mainBanner3Image,
    },
  ]

  const handlePrev = () => {
    if (Number(activeSlide) === 0) {
      setActiveSlide(2)
    } else {
      setActiveSlide((prev) => Math.max(prev - 1, 0))
    }
  }

  const handleNext = () => {
    console.log(Number(activeSlide))
    if (Number(activeSlide) === 2) {
      setActiveSlide(0)
    } else {
      setActiveSlide((prev) => Math.min(prev + 1, data.length - 1))
    }
  }

  const translateValue: number = -activeSlide * 100

  return (
    <CarouselContainer>
      <Buttons onClick={handlePrev}>
        <ArrowIcon src={btnSlideLeft} alt="Left Arrow"></ArrowIcon>
      </Buttons>
      <SlideMenuBox>
        <SlideContainerBox translateValue={translateValue}>
          {data.map((item, index) => (
            <SlideBox key={index}>
              <ContentBox>
                <SlideContentBox>{item.title}</SlideContentBox>
                <SlideContentBox>{item.middeleTitle}</SlideContentBox>
                <SlideContentBox>{item.content}</SlideContentBox>
              </ContentBox>
              <SlideImgBox>
                <img style={{ width: '640px' }} src={item.img} alt={`Slide ${index + 1}`} />
              </SlideImgBox>
            </SlideBox>
          ))}
        </SlideContainerBox>
      </SlideMenuBox>

      <Buttons onClick={handleNext}>
        <ArrowIcon src={btnSliderRight} alt="Right Arrow"></ArrowIcon>
      </Buttons>
    </CarouselContainer>
  )
}

export default Slide

const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  height: 100%;
  margin: 0 auto;
`

const SlideMenuBox = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const SlideContainerBox = styled.div<{ translateValue: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(${(props) => props.translateValue}px);
  transition: transform 0.5s;
`

const SlideBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 100vw;
`
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 565px;
  height: 261px;
`
const SlideContentBox = styled.div`
  flex: 1;
  text-align: center;
`
// const ImgBox = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 590px;
// `

const SlideImgBox = styled.div`
  width: 100vw;
`

const Buttons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  border-radius: 50%;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
`

const ArrowIcon = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #404040;
`
