import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreSession, csrfFetch } from './store/csrf';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { login, logout, signUpUser } from './store/session';
import * as sessionActions from './store/session';

// Testing
window.login = login;
window.logout = logout;
window.signUpUser = signUpUser;

const initializeApp = () => {
  let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  let initialState = {};

  if (process.env.NODE_ENV !== 'production') {
    window.csrfFetch = csrfFetch;
    window.sessionActions = sessionActions;
  }

  if (currentUser) {
    initialState = {
      users: {
        [currentUser.id]: currentUser,
      },
    };
  }
  const store = configureStore(initialState);
  window.store = store;

  const root = createRoot(document.getElementById('root'));
  // debugger;
  return root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

// ensure that we check if we are logged in before initializing our app
// also sets up csrf and currentUser if we need it
restoreSession().then(initializeApp);
