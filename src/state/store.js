import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers/reducers';

const configureStore = (persistedState) => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(
    reducers,
    persistedState,
    applyMiddleware(...middlewares)
  );
}

export default configureStore;
