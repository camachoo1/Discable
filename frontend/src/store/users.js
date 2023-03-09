import { ADD_SERVER, REMOVE_SERVER } from './server';
import { REMOVE_CURRENT_USER } from './session';
import { ADD_FRIENDS } from './friend';
import { ADD_CHANNEL } from './channel';
const CLEAR_USERS = 'users/clearUsers';

export const clearUsers = () => ({
  type: CLEAR_USERS,
});

const usersReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case ADD_SERVER:
      return action.payload.users;
    case REMOVE_SERVER:
      delete nextState[action.serverId];
      return nextState;
    case CLEAR_USERS:
      return {};
    case ADD_FRIENDS:
      // return { ...state, ...action.payload.users };
      return { ...action.payload.users };

    case ADD_CHANNEL:
      if (action.payload.users) {
        return { ...state, ...action.payload.users };
        // return { ...action.payload.users };
      } else {
        return nextState;
      }
    case REMOVE_CURRENT_USER:
      return {};
    default:
      return nextState;
  }
};

export default usersReducer;
