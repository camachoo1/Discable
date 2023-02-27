import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import ServerNavBar from './components/ServerNavBar';
import ServerShowPage from './components/ServerShowPage';
import SignupFormPage from './components/SignupForm';
import SplashPage from './components/SplashPage';
import UserShowPage from './components/UserShowPage';
import BottomPanel from './components/UserShowPage/BottomPanel';
import ServerFormPage from './components/ServerFormPage';
import ErrorPage from './components/ErrorPage';

const App = () => {
  // const [showModal, setShowModal] = useState(false);
  return (
    <div className='app'>
      <ServerNavBar />
      <BottomPanel />
      <Routes>
        <Route exact path='/' element=<SplashPage /> />
        <Route exact path='/login' element=<LoginFormPage /> />
        <Route exact path='/register' element=<SignupFormPage /> />
        <Route exact path='/@me' element=<UserShowPage /> />
        <Route exact path='/servers/new' element=<ServerFormPage /> />
        <Route
          exact
          path='/servers/:serverId'
          element=<ServerShowPage />
        />
        <Route path='/error' element=<ErrorPage /> />
        <Route
          path='/error'
          render={() => <Navigate to='/error' />}
        />
      </Routes>
    </div>
  );
};

export default App;
