import { ADD_SERVER, REMOVE_SERVER } from './server';
import { REMOVE_CURRENT_USER } from './session';

const usersReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case ADD_SERVER:
      return action.payload.users;
    case REMOVE_SERVER:
      delete nextState[action.serverId];
      return nextState;
    case REMOVE_CURRENT_USER:
      return {};
    default:
      return nextState;
  }
};

export default usersReducer;
