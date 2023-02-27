import { csrfFetch } from './csrf';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

// ACTION CREATORS
const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER,
  };
};

// THUNK ACTION CREATORS
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await res.json();
  dispatch(setCurrentUser(data.user));
  return res;
};

export const logout = () => async (dispatch) => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE',
  });

  dispatch(removeCurrentUser());
  storeCurrentUser(null);
  return res;
};

export const signUpUser = (user) => async (dispatch) => {
  const { username, email, password } = user;
  let res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  let data = await res.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return res;
};

const initialState = {
  user: JSON.parse(sessionStorage.getItem('currentUser')),
};

// const initialState = {};

// HELPER METHOD TO DRY UP CODE
const storeCurrentUser = (user) => {
  if (user)
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  else sessionStorage.removeItem('currentUser');
};

const sessionReducer = (state = initialState, action) => {
  // const nextState = { ...state };
  switch (action.type) {
    case SET_CURRENT_USER:
      // nextState.user = action.payload.id;
      // return nextState;
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      // nextState.user = null;
      // return nextState;
      return { ...state, user: null };
    default:
      // return nextState;
      return state;
  }
};

export default sessionReducer;
