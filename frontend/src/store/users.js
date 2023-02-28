import { ADD_SERVER, REMOVE_SERVER } from './server';

const usersReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case ADD_SERVER:
      return action.payload.users;
    case REMOVE_SERVER:
      delete nextState[action.serverId];
      return nextState;
    default:
      return nextState;
  }
};

export default usersReducer;
