import {
  applyMiddleware,
  legacy_createStore,
  combineReducers,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import serverReducer from './server';
import serverSubscriptionsReducer from './serverSubscriptions';
import sessionReducer from './session';
import usersReducer from './users';

const rootReducer = combineReducers({
  session: sessionReducer,
  servers: serverReducer,
  serverSubscriptions: serverSubscriptionsReducer,
  users: usersReducer,
});

// const middleware = [thunk];
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(logger);
// }
let enhancer;
if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) =>
  legacy_createStore(rootReducer, preloadedState, enhancer);

export default configureStore;
