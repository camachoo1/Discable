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
import * as serverActions from './store/server';

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
    window.serverActions = serverActions;
  }

  if (currentUser) {
    initialState = {
      session: {
        [currentUser.id]: currentUser,
      },
    };
  }
  const store = configureStore(initialState);
  window.store = store;

  const root = createRoot(document.getElementById('root'));
  return root.render(
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  );
};

// ensure that we check if we are logged in before initializing our app
// also sets up csrf and currentUser if we need it
restoreSession().then(initializeApp);
