import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupForm';
import SplashPage from './components/SplashPage';
import UserShowPage from './components/UserShowPage';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={SplashPage} />
        <Route exact path='/login' component={LoginFormPage} />
        <Route exact path='/register' component={SignupFormPage} />
        <Route exact path='/me' component={UserShowPage} />
      </Switch>
    </>
  );
};

export default App;
