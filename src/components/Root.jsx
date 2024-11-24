import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import MainPage from './mainpage/MainPage';

export default function Root() {
  return (
    <HashRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </HashRouter>
  );
}
