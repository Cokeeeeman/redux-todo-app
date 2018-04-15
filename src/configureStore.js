import todos from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';

const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch);
  }
  return next(action);
};

const configureStore = () => {
  const middlewares = [thunk];
  const logger = createLogger();

  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }

  return createStore(
    todos,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
