// import { csrfFetch } from './csrf';

// const RECEIVE_USER = 'users/RECEIVE_USER';
// const REMOVE_USER = 'users/REMOVE_USER';

// export const receiveUser = (user) => ({
//   type: RECEIVE_USER,
//   payload: user,
// });

// export const removeUser = (userId) => ({
//   type: REMOVE_USER,
//   userId,
// });

// // THUNK ACTION CREATORS

// export const loginUser = (user) => async (dispatch) => {
//   let res = await csrfFetch('/api/session', {
//     method: 'POST',
//     body: JSON.stringify(user),
//   });

//   let data = await res.json();
//   saveCurrentUser(data.user);
//   // sessionStorage.setItem('currentUser', JSON.stringify(data.user));
//   dispatch(receiveUser(data.user));
// };

// export const logoutUser = (userId) => async (dispatch) => {
//   let res = await csrfFetch('/api/session', {
//     method: 'DELETE',
//   });

//   dispatch(removeUser(userId));
//   // sessionStorage.removeItem('currentUser');
//   saveCurrentUser(null);
//   return res;
// };

// export const signupUser = (user) => async (dispatch) => {
//   let res = await csrfFetch('/api/users', {
//     method: 'POST',
//     body: JSON.stringify(user),
//   });

//   if (res.ok) {
//     let data = await res.json();
//     saveCurrentUser(data.user);
//     dispatch(receiveUser(data.user));
//     return res;
//   }
//   // if needed to save user - add return data.user
// };

// // HELPER METHOD TO DRY UP CODE
// const saveCurrentUser = (user) => {
//   if (user)
//     sessionStorage.setItem('currentUser', JSON, stringify(user));
//   else sessionStorage.removeItem('currentUser');
// };

// const usersReducer = (state = {}, action) => {
//   const nextState = { ...state };
//   switch (action.type) {
//     case RECEIVE_USER:
//       nextState[action.payload.id] = action.payload;
//       return nextState;
//     case REMOVE_USER:
//       delete nextState[action.userId];
//       return nextState;
//     default:
//       return nextState;
//   }
// };

// export default usersReducer;
