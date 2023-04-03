import { csrfFetch } from './csrf';

// Constants
const ADD_CHANNELS = 'channels/addChannels';
export const ADD_CHANNEL = 'channels/addChannel';
const REMOVE_CHANNEL = 'channels/removeChannel';
const CLEAR_CHANNELS = 'channels/clearChannels';

// Action Creators
export const addChannels = (channels) => ({
  type: ADD_CHANNELS,
  payload: channels,
});

export const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  payload: channel,
});

export const removeChannel = (channelId) => ({
  type: REMOVE_CHANNEL,
  channelId,
});

export const clearChannels = () => ({
  type: CLEAR_CHANNELS,
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

export const createChannel = async (channelInfo) => {
  const res = await csrfFetch(
    `/api/servers/${channelInfo.serverId}/channels`,
    {
      method: 'POST',
      body: JSON.stringify(channelInfo),
    }
  );
  if (res.ok) {
    const channelId = await res.json();
    return channelId;
  }
};

export const updateChannel = async (channel) => {
  const res = await csrfFetch(`/api/channels/${channel.id}`, {
    method: 'PATCH',
    body: JSON.stringify(channel),
  });

  if (res.ok) {
    const data = await res.json();
    return data;
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
      return { ...action.payload };
    case ADD_CHANNEL:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_CHANNEL:
      delete nextState[action.channelId];
      return nextState;
    case CLEAR_CHANNELS:
      return {};
    default:
      return nextState;
  }
};

export default channelReducer;
