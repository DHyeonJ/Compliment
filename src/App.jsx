import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Router from './shared/Router'
import './App.css'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

// 전역으로 reset CSS

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Delicious+Handrawn&family=Nanum+Brush+Script&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');
${reset}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router />
    </QueryClientProvider>
  )
}

export default App
