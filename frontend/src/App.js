import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupForm';
import SplashPage from './components/SplashPage';
import UserShowPage from './components/UserShowPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path='/' element=<SplashPage /> />
        <Route exact path='/login' element=<LoginFormPage /> />
        <Route exact path='/register' element=<SignupFormPage /> />
        <Route exact path='/@me' element=<UserShowPage /> />
      </Routes>
    </>
  );
};

export default App;
