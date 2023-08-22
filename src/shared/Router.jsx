import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Mypage from '../pages/user/Mypage';
import IntroPage from '../pages/IntroPage';
import NotFoundPage from '../pages/NotFoundPage';
import AddBoard from '../pages/board/AddBoard';
import DetailPage from '../pages/board/DetailPage';
import EditBoard from '../pages/board/EditBoard';
import ListPage from '../pages/board/ListPage';
import MissionPage from '../pages/MissionPage/MissionPage';
import Signup from '../pages/user/Signup';
import EditUserInfo from '../pages/user/EditUserInfo';
import Login from '../pages/user/Login';
import Layout from './Layout';

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/addboard" element={<AddBoard />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/editboard/:id" element={<EditBoard />} />
        <Route path="/listpage" element={<ListPage />} />
        <Route path="/missionpage" element={<MissionPage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edituserinfo" element={<EditUserInfo />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
