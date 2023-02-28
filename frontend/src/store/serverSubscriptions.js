import { ADD_SERVER, REMOVE_SERVER } from './server';

const serverSubscriptionsReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case ADD_SERVER:
      // debugger;
      return action.payload.serverSubscriptions;
    case REMOVE_SERVER:
      delete nextState[action.serverId];
      return nextState;
    default:
      return nextState;
  }
};

export default serverSubscriptionsReducer;
