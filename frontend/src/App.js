import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import ServerNavBar from './components/ServerNavBar';
import ServerShowPage from './components/ServerShowPage';
import SignupFormPage from './components/SignupForm';
import SplashPage from './components/SplashPage';
import UserShowPage from './components/UserShowPage';
import BottomPanel from './components/UserShowPage/BottomPanel';
import ErrorPage from './components/ErrorPage';

const App = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <div className='app'>
      <ServerNavBar isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
      <BottomPanel />
      <Routes>
        <Route path='/' element={<SplashPage />} />
        <Route path='/login' element={<LoginFormPage />} />
        <Route path='/register' element={<SignupFormPage />} />
        <Route path='/@me' element={<UserShowPage />} />
        <Route
          path='@me/channels/:channelId'
          element={<UserShowPage />}
        />

        <Route
          path='/servers/:serverId/channels/:channelId'
          element={
            <ServerShowPage
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
            />
          }
        />
        <Route
          path='/servers/:serverId'
          element={
            <ServerShowPage
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
            />
          }
        />
        <Route path='/error' element={<ErrorPage />} />
        <Route path='*' element={<Navigate to='/error' />} />
      </Routes>
    </div>
  );
};

export default App;
