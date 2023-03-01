import { csrfFetch } from './csrf';

// Constants
const ADD_CHANNELS = 'channels/addChannels';
const ADD_CHANNEL = 'channels/addChannel';
const REMOVE_CHANNEL = 'channels/removeChannel';

// Action Creators
export const addChannels = (payload) => ({
  type: ADD_CHANNELS,
  payload,
});

export const addChannel = (payload) => ({
  type: ADD_CHANNEL,
  payload,
});

export const removeChannel = (channelId) => ({
  type: REMOVE_CHANNEL,
  channelId,
});

// Thunk Action Creators
export const fetchChannels = (serverId) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers/${serverId}/channels`);

  if (res.ok) {
    const data = await res.json();
    dispatch(addChannels(data));
  }
};

export const fetchChannel = (channelId) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${channelId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(addChannel(data));
  }
};

export const createChannel = (channelInfo) => async (dispatch) => {
  const res = await csrfFetch(
    `/api/servers/${channelInfo.serverId}/channels`,
    {
      method: 'POST',
      body: JSON.stringify(channelInfo),
    }
  );

  if (res.ok) {
    const data = await res.json();
    dispatch(addChannel(data));
    return data;
  }
};

export const updateChannel = (channel) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${channel.id}`, {
    method: 'PATCH',
    body: JSON.stringify(channel),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addChannel(data));
  }
};

export const deleteChannel = (channelId) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${channelId}`, {
    method: 'DELETE',
  });

  if (res.ok) dispatch(removeChannel(channelId));
};

// Channels Reducer
const channelReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case ADD_CHANNELS:
      return { ...action.payload.channels };
    case ADD_CHANNEL:
      return {
        ...state,
        [action.payload.channel.id]: action.payload.channel,
      };
    case REMOVE_CHANNEL:
      delete nextState[action.channelId];
      return nextState;
    default:
      return nextState;
  }
};

export default channelReducer;
