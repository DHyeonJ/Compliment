import React, { useState, Component } from 'react'

import styled from 'styled-components'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

import mainBanner1Image from '../img/mainBanner1.png'
import mainBanner2Image from '../img/mainBanner2.png'
import mainBanner3Image from '../img/mainBanner3.png'

function Slide() {
  const settings = {
    slide: 'div',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 960, // 화면 사이즈 960px일 때
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768, // 화면 사이즈 768px일 때
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 320, // 화면 사이즈 320px일 때
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }
  const data = [
    {
      title: '칭찬을 구해요, 칭구',
      middeleTitle: '칭찬에 익숙해지세요.',
      content: '우리는 일상 속에서 자랑스러운 순간들을 늘 경험하고 있습니다.\n 오늘도 내 소중한 순간들을 그냥 흘려보내고 있지는 않으신가요? \n이런 순간들에 대해 때론, 인정과 칭찬이 필요한 법입니다.',
      img: mainBanner1Image,
    },
    {
      title: '긍정 에너지를 함께 나눠요',
      middeleTitle: '나만의 작은 성취에 칭찬을 돌려드려요.',
      content: '나 혼자만 아는 오늘의 작은 성취, 그냥 넘어가지 마세요!\n 오늘도 생생히 살아있는 서로에게 칭찬 한마디를 남겨주세요.\n 작지만 사소하지 않은 경험이 모여 내일을 사는 힘이 됩니다.',
      img: mainBanner2Image,
    },
    {
      title: '매일 미션이 도착해요',
      middeleTitle: '칭찬, 어떻게 시작하면 좋을까요?',
      content: '서로 칭찬과 격려를 통해 긍정 에너지를 주고 받으세요. \n이 모든 것은 아주 작은 선행으로부터 시작됩니다. \n매일 도착하는 미션카드를 통해 영감을 얻을 수 있습니다.',
      img: mainBanner3Image,
    },
  ]

  return (
    <StyledSlider {...settings}>
      {data?.map((item, index) => (
        <div key={index}>
          <Box>
            <BannerContentsBox>
              <BannerTitleBox>{item.title}</BannerTitleBox>
              <BannermiddleTitleBox>{item.middeleTitle}</BannermiddleTitleBox>
              <BannerContentBox>{item.content}</BannerContentBox>
            </BannerContentsBox>
            <ImgInfoBox url={item.img} alt={`Slide ${index + 1}`} />
          </Box>
        </div>
      ))}
    </StyledSlider>
  )
}

export default Slide

const StyledSlider = styled(Slider)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 450px;

  background: #f4f1e9;

  border-radius: 20px;

  .slick-slide {
    margin: 0 auto;
  }

  .slick-list {
    width: 1280px;
  }

  .slick-dots {
    position: absolute;
    bottom: 25px;

    display: block;

    width: 100%;

    margin: 0;
    padding: 0;

    list-style: none;
    text-align: center;
  }

  .slick-dots li button {
    width: 10px;
    height: 10px;

    background-size: cover;

    border-radius: 70%;

    :active {
      background-color: #000;
    }
  }

  .slick-dots li {
    transition: transform 0.3s ease-in-out;
  }

  .slick-dots li.slick-active {
    transform: scale(1.2);
  }
`

// element style로 display: block이 먹혔는지 확인이 필요함
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  margin: 0 auto;
`

const BannerContentsBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  justify-content: center;

  height: 450px;

  padding-left: 44px;

  box-sizing: border-box;
`

const BannerTitleBox = styled.div`
  height: 64px;

  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const BannermiddleTitleBox = styled.div`
  height: 36px;

  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 150% */
`

const BannerContentBox = styled.div`
  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 155.556% */
  white-space: pre-line;
`

const ImgInfoBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;

  height: 450px;

  background-image: ${(props) => `url(${props.url})`};
  background-repeat: no-repeat;

  border-radius: 20px;
`
