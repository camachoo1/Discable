import { csrfFetch } from './csrf';

// TYPE CONSTANTS
const ADD_FRIEND = 'friends/addFriend';
export const ADD_FRIENDS = 'friends/addFriends';
const REMOVE_FRIEND = 'friends/removeFriend';
export const CLEAR_FRIENDS = 'friends/clearFriends';

// ACTION CREATORS
export const addFriend = (friend) => ({
  type: ADD_FRIEND,
  payload: friend,
});

export const addFriends = (friends) => ({
  type: ADD_FRIENDS,
  payload: friends,
});

export const removeFriend = (friendId) => ({
  type: REMOVE_FRIEND,
  payload: friendId,
});

export const clearFriends = () => ({
  type: CLEAR_FRIENDS,
});
// THUNK ACTION CREATORS
export const fetchFriends = () => async (dispatch) => {
  const res = await csrfFetch('/api/friends');
  if (res.ok) {
    const friends = await res.json();
    dispatch(addFriends(friends));
  }
};

export const createFriend = (friendInfo) => {
  csrfFetch('/api/friends', {
    method: 'POST',
    body: JSON.stringify(friendInfo),
  });
};

export const updateFriend = (friendInfo) => {
  csrfFetch(`/api/friends/${friendInfo.id}`, {
    method: 'PATCH',
    body: JSON.stringify(friendInfo),
  });
};

export const deleteFriend = (friendId) => {
  csrfFetch(`/api/friends/${friendId}`, {
    method: 'DELETE',
  });
};

// REDUCER
const friendReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case ADD_FRIENDS:
      return { ...state, ...action.payload.friends };
    // return { ...action.payload };
    case ADD_FRIEND:
      // debugger;
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_FRIEND:
      delete nextState[action.friendId];
      return nextState;
    case CLEAR_FRIENDS:
      return {};
    default:
      return nextState;
  }
};

export default friendReducer;
