import { csrfFetch } from './csrf';
import { REMOVE_CURRENT_USER } from './session';

// Constants
export const ADD_SERVER = '/servers/ADD_SERVER';
const ADD_SERVERS = '/servers/ADD_SERVERS';
export const REMOVE_SERVER = '/servers/REMOVE_SERVERS';

// Action Creators

export const addServer = (server) => ({
  type: ADD_SERVER,
  server,
});

export const addServers = (servers) => ({
  type: ADD_SERVERS,
  servers,
});

export const removeServer = (serverId) => ({
  type: REMOVE_SERVER,
  serverId,
});

// Thunk Action Creators

export const fetchServer = (serverId) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers/${serverId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(addServer(data));
  }
};

export const fetchServers = () => async (dispatch) => {
  const res = await csrfFetch(`/api/servers`);

  if (res.ok) {
    const data = await res.json();
    dispatch(addServers(data));
  }
};

export const createServer = (server) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers`, {
    method: 'POST',
    body: JSON.stringify({ server }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addServer(data));
    return data;
  }
};

export const updateServer = (server) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers/${server.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ server }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addServer(data));
  }
};

export const deleteServer = (serverId) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers/${serverId}`, {
    method: 'DELETE',
  });

  if (res.ok) dispatch(removeServer(serverId));
};

export const joinServer = (serverInfo) => async (dispatch) => {
  const res = await csrfFetch(`/api/server_subscriptions`, {
    method: 'POST',
    body: JSON.stringify(serverInfo),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addServer(data.server));
  }
};

export const leaveServer =
  (serverId, subscriptionId) => async (dispatch) => {
    const res = await csrfFetch(
      `/api/server_subscriptions/${subscriptionId}`,
      {
        method: 'DELETE',
      }
    );

    if (res.ok) dispatch(removeServer(serverId));
  };

// Server Reducer

const serverReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case ADD_SERVER:
      return {
        ...state,
        [action.server.id]: action.server,
      };
    case ADD_SERVERS:
      return { ...action.servers };
    case REMOVE_SERVER:
      delete nextState[action.serverId];
      return nextState;
    case REMOVE_CURRENT_USER:
      return {};
    default:
      return nextState;
  }
};

export default serverReducer;
