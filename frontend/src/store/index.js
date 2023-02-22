import {
  applyMiddleware,
  legacy_createStore,
  combineReducers,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';

const rootReducer = combineReducers({
  session: sessionReducer,
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
