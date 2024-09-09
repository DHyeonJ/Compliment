<img src='https://velog.velcdn.com/images/palpalkim/post/80fc9a3d-9231-4f37-bb60-5f92b7516b5d/image.png'/>
<br>
<br>
    <H1>칭찬을 구해요, 칭구</H1>

</div>
<br>
<br>
<div align="center">
	<h4>✨ Languages ✨</h4>
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=javascript&logoColor=white"/>
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=HTML5&logoColor=white"/>
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=CSS3&logoColor=white"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
</div>
<br>
<br>

<div align="center">
<h3>👨🏼‍💻👩🏼‍💻 팀원 소개👨🏼‍💻👩🏼‍💻</h3>

전대현 https://github.com/DHyeonJ <br/>
나혜인 https://github.com/hyensssu <br/>
김의진 https://github.com/kimpalpal <br/>
박지환 https://github.com/orasio3477<br/>
</div>
<br>
<br>
<div align="center">
<h2>🏅프로젝트 소개</h2>
서로를 응원하고 격려하는 소중한 순간을 기록하고 공유하는 특별한 공간인 칭구를 소개합니다.<br>
현대 사회에서 우리는 자주 스트레스와 힘든 일상에 직면하게 됩니다. <br>
또한 혐오와 차별이 난무하는 인터넷 공간에 대한 피로도가 상승하고 있습니다.<br>
이런 상황에서 소중한 것은 서로의 긍정적인 면을 인정하고 응원하는 것이 중요하다고 생각하였습니다.<br>
칭구는 이러한 필요성을 충족시키기 위해 탄생하게 되었습니다.<br>
</div>
<br>
<br>
<div align="center">
<h2>🏅페이지 소개</h2>
<div>
  <h5> 🎊 메인 페이지: 참여가 활발한 유저 ( 댓글 작성 횟수, 좋아요 가장 많은 글 작성자)는 메인에 랭킹되어 확인 할 수 있습니다. </h5>
     <img height="500" src="https://velog.velcdn.com/images/palpalkim/post/c8cc38f3-7eba-400c-bd4f-91dc5374bd38/image.png"/>
     <br>
<br>
 <h5>  🎊칭구리스트(칭찬게시글)작성 : 칭찬글을 작성할 수 있습니다.  </h5>
   <img src="https://velog.velcdn.com/images/palpalkim/post/6b77aa7a-1d9d-4f5f-bf44-d8c96e03756e/image.png"/>
<br>
<br>
  <h5> 🎊미션페이지 : 매일 새로운 미션 4가지를 제시하여 일상생활에서도 칭찬을 나눌 수 있도록 합니다. </h5>
   <img src="https://velog.velcdn.com/images/palpalkim/post/1d8544e2-24b0-44c1-8df3-d35fae3b2504/image.png"/>
  <br>
<br>
 <h5>  🎊마이페이지 : 내가 작성한 글, 내가 좋아요 누른글, 미션 참여 현황을 확인 할 수 있습니다. </h5>
  <img src="https://velog.velcdn.com/images/palpalkim/post/53d8931d-bebf-4bd6-ae4e-a85a80c03ede/image.png"/>
</div>

<br>
<br>

<div align="left"><br><br>

  
## 프로젝트 브로셔
[Project Browser : Compliment](https://phantom-feverfew-5f9.notion.site/9ad1e087c07945c6ba4f4dfb774aa769)

## 페이지 구성

- 메인페이지
- 칭구리스트 ( 게시판 페이지)
- 칭구 작성 페이지 ( 게시글 작성)
  - 작성/수정 페이지
- 회원가입
- 로그인
- 마이페이지
- 미션페이지

## 깃 플로우 전략

- `main`
- `dev`
- `feat`
  - header
  - footer
  - ListPage
  - myPage
    
1. 본인 기능 구현한 브랜치 push 하기 → `git push origin feat/comments`
2. 본인 기능 구현한 브랜치에 dev 브랜치 pull 받기 → `git pull origin dev`
3. 충돌 있으면 해결 후 본인 브랜치에 push 함 → `git push origin feat/comments`
4. 본인 브랜치에서 dev로 PR 날림
5. PR 리뷰 후, 2명 이상 승인 시 merge 버튼 활성화

## 커밋 컨벤션

- Feat: 새로운 기능 추가
- Fix: 버그 수정
- Style: 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우
- Chore: 설정 변경 등 기타 변경사항
- Design: HTML, CSS 등 사용자 UI 디자인 변경
- Resolve: 충돌 해결

## 코드 컨벤션

#### 컴포넌트 파일명은 _파스칼 케이스_ 로 작성합니다.

```tsx
Companion.tsx;
```

#### 컴포넌트를 제외한 폴더, 파일명은 _카멜 케이스_ 로 작성합니다.

```tsx
// 폴더명
api;
components;

// 파일명 (컴포넌트 이외)
configStore.ts;
index.ts;
```

#### 함수명, 변수명은 _카멜 케이스_ 로 작성합니다.

```tsx
// 함수명
const findCompanion = () => {};

// 변수명
const [name, setName] = useState('');
let joinedCompanion = [john, karina];
```

#### 클래스명은 _케밥 케이스_ 로 작성합니다.

```tsx
<h1 class="main-title">동행 구함</h1>
```

#### Styled-Components를 적용한 html 태그명은 아래와 같이 작성합니다.

- 스타일 파일 import

```tsx
import * as St from ‘./경로'
```

- 각 html 태그명

```tsx
div: '컴포넌트명' Box
section : '컴포넌트명'Section
ul : '컴포넌트명' List
li : '컴포넌트명' Item
p : '컴포넌트명' Paragraph
span : '컴포넌트명' Span
```

#### 스타일 코드의 순서는 아래와 같이 작성합니다.

```ts
.sample {
  /* position 관련 */
  position: absolute;
  top: 0;
  left: 0;

  /* display 관련 */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  /* size 관련 */
  width: auto;
  height: auto;

  /* margin, padding */
  margin: 0 auto;
  padding: 12px;

  /* background 관련 */
  background-color: #ffffff;

  /* border 관련 */
  border: 1px solid #ffffff;
  border-radius: 12px;

  /* font 관련 */
  font-size: 24px;
  font-weight: 700;
  text-align: center;

  /* animation 관련 */
  transform: translate(10px, 100%);
  transition: 300ms;
}
```

## 코드 컨벤션

### 폴더, 파일명

컴포넌트 파일명은 파스칼 케이스(PascalCase)를 사용한다.

```ts
MainComponent.jsx;
Route.jsx;
```

컴포넌트를 제외한 폴더, 파일명은 카멜 케이스(camelCase)를 사용한다.

```ts
components;
modules;
configStore.js;
```

### 함수

함수명은 카멜 케이스(camelCase)를 원칙으로 한다.

```ts
function nameOfFunction() {
  // ...some logic
}
```

### 변수명

상수는 모두 대문자로 쓰며 띄어쓰기는 \_로 처리하며, 객체타입의 경우 카멜 케이스를 적용한다.

```ts
const SOME_VALUE = 1;

const people = {
  name: '김자바',
  age: '26',
};
```

### 클래스명

클래스명은 케밥 케이스(kebab-case)를 원칙으로 한다.

```html
<h1 class="main-title">오늘 메뉴 추천</h1>
```
</div>
