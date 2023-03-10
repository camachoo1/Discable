import React from 'react';
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
import * as channelActions from './store/channel';
import * as messageActions from './store/message';
import * as friendActions from './store/friend';

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
    window.channelActions = channelActions;
    window.messageActions = messageActions;
    window.friendActions = friendActions;
  }

  if (currentUser) {
    initialState = {
      session: {
        user: currentUser,
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
