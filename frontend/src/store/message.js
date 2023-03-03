import { csrfFetch } from './csrf';

// Constants
const ADD_MESSAGES = 'messages/addMessages';
const ADD_MESSAGE = 'messages/addMessage';
const REMOVE_MESSAGE = 'messages/removeMessage';
const CLEAR_MESSAGES = 'messages/clearMessages';

// Action Creators

export const addMessages = (payload) => ({
  type: ADD_MESSAGES,
  payload,
});

export const addMessage = (payload) => ({
  type: ADD_MESSAGE,
  payload,
});

export const removeMessage = (messageId) => ({
  type: REMOVE_MESSAGE,
  payload: messageId,
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});

// Thunk Action Creators

export const fetchMessages =
  (serverId, channelId) => async (dispatch) => {
    const res = await csrfFetch(
      `/api/servers/${serverId}/channels/${channelId}/messages`
    );

    if (res.ok) {
      const messages = await res.json();
      // debugger;
      dispatch(addMessages(messages));
    }
  };

export const createMessage = (messageInfo) => {
  return csrfFetch('/api/messages', {
    method: 'POST',
    body: JSON.stringify(messageInfo),
  });
};

export const updateMessage = (messageInfo) => async (dispatch) => {
  const res = await csrfFetch(`/api/messages/${messageInfo.id}`, {
    method: 'PATCH',
    body: JSON.stringify(messageInfo),
  });

  if (res.ok) {
    const message = await res.json();
    dispatch(addMessage(message));
  }
};

export const deleteMessage = (messageId) => async (dispatch) => {
  const res = await csrfFetch(`/api/messages/${messageId}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(removeMessage(messageId));
  }
};

// Reducer

const messageReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case ADD_MESSAGES:
      return { ...action.payload.messages };
    case ADD_MESSAGE:
      return {
        ...state,
        [action.payload.message.id]: action.payload.message,
      };
    case REMOVE_MESSAGE:
      delete nextState[action.messageId];
      return nextState;
    case CLEAR_MESSAGES:
      return {};
    default:
      return nextState;
  }
};

export default messageReducer;
