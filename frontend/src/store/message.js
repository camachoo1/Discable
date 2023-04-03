import { csrfFetch } from './csrf';

// Constants
const ADD_MESSAGES = 'messages/addMessages';
const ADD_MESSAGE = 'messages/addMessage';
const REMOVE_MESSAGE = 'messages/removeMessage';
const CLEAR_MESSAGES = 'messages/clearMessages';

// Action Creators

export const addMessages = (messages) => ({
  type: ADD_MESSAGES,
  messages,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message,
});

export const removeMessage = (messageId) => ({
  type: REMOVE_MESSAGE,
  messageId,
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
      dispatch(addMessages(messages));
    }
  };

export const createMessage = (messageInfo) =>
  csrfFetch('/api/messages', {
    method: 'POST',
    body: JSON.stringify(messageInfo),
  });

export const updateMessage = (messageInfo) =>
  csrfFetch(`/api/messages/${messageInfo.id}`, {
    method: 'PATCH',
    body: JSON.stringify(messageInfo),
  });

export const deleteMessage = (messageId) =>
  csrfFetch(`/api/messages/${messageId}`, {
    method: 'DELETE',
  });

// Reducer

const messageReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case ADD_MESSAGES:
      return { ...action.messages };
    case ADD_MESSAGE:
      return {
        ...state,
        [action.message.id]: action.message,
      };
    case REMOVE_MESSAGE:
      delete nextState[action.messageId];
      return nextState;
    case CLEAR_MESSAGES:
      return {};
    default:
      return state;
  }
};

export default messageReducer;
