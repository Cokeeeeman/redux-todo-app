import todoApp from "./reducers";
import { createStore } from "redux";
import { loadState, saveState } from "./util/localStorage";
import throttle from "lodash/throttle";

const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  } else {
    return next(action);
  }
};

const logger = (store) => (next) => {
  if (!console.group) {
    return next;
  }

  return (action) => {
    console.group(action.type);
    console.log("%c Prev state: ", "color: gray", store.getState());
    console.log("%c Action: ", "color: blue", action);
    const returnValue = next(action);
    console.log("%c Next state: ", "color: green", store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach((middleware) => {
    store.dispatch = middleware(store)(store.dispatch);
  });
};

const configureStore = () => {
  const preloadedState = loadState();

  const store = createStore(todoApp, preloadedState);

  const middlewares = [ promise ];

  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  const saveStateLocal = () => {
    saveState({
      todos: store.getState().todos
    });
  };

  store.subscribe(throttle(saveStateLocal, 1000));

  return store;
};

export default configureStore;
