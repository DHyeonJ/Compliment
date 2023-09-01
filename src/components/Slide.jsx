import React, { useState, Component } from 'react'
import styled from 'styled-components'
import mainBanner1Image from '../img/mainBanner1.png'
import mainBanner2Image from '../img/mainBanner2.png'
import mainBanner3Image from '../img/mainBanner3.png'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

function Slide() {
  const settings = {
    slide: 'div',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // arrows: true,
    draggable: false,
    autoplay: true, // 자동 스크롤 사용 여부
    autoplaySpeed: 10000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    // prevArrow: "<button type='button' class='slick-prev'>Previous</button>", // 이전 화살표 모양 설정
    // nextArrow: "<button type='button' class='slick-next'>Next</button>",
    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 960, // 화면 사이즈 960px일 때
        settings: {
          // 위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // 화면 사이즈 768px일 때
        settings: {
          // 위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow: 2,
        },
      },
    ],
  }
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
        // 이친구는 무조건 있어야함
        <div key={index}>
          <Box>
            <BannerContents>
              <BannerTitle>{item.title}</BannerTitle>
              <BannermiddleTitle>{item.middeleTitle}</BannermiddleTitle>
              <BannerContent>{item.content}</BannerContent>
            </BannerContents>
            <ImgInfo url={item.img} alt={`Slide ${index + 1}`} />
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
  border-radius: 20px;
  background: #f4f1e9;
  gap: 16px;
  .slick-slide {
    margin: 0 auto;
  }
  .slick-list {
    width: 1279px;
    height: 328px;
  }
  .slick-track {
    height: 328px;
  }
  .slick-dots {
    position: absolute;
    bottom: 25px;
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
  }
  .slick-dots li button {
    background-color: #ffffff;
    width: 10px;
    height: 10px;
    border-radius: 70%;
    /* background-image: url('custom-dot-icon.png'); */
    background-size: cover;
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
  width: 1244px;
  height: 328px;
`

const BannerContent = styled.div`
  width: 451px;
  height: 84px;
  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 155.556% */
  white-space: pre-line;
`

const BannermiddleTitle = styled.div`
  width: 366px;
  height: 36px;
  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 150% */
`

const BannerTitle = styled.div`
  width: 541px;
  height: 64px;
  color: #000;
  font-family: LINE Seed Sans KR;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const BannerContents = styled.div`
  width: 366px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`

const ImgInfo = styled.div`
  width: 300px;
  height: 328px;
  flex: 1;
  background-image: ${(props) => `url(${props.url})`};
  background-repeat: no-repeat;
`
