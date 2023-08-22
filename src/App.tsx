import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';
import './App.css';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// 전역으로 reset CSS

const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    font-family: 'Noto Sans KR', sans-serif;
    //background-color: #313131;
  }

  body.active {
    overflow: hidden;
  }
  
  .slick-slide {
      margin-left: 10px;
      margin-right: 10px;
    }

  
`;
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
