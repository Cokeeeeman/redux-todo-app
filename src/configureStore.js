import todoApp from "./reducers";
import { createStore } from "redux";
import { loadState, saveState } from "./util/localStorage";
import throttle from "lodash/throttle";

const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(rawDispatch);
    } else {
      return rawDispatch(action);
    }
  };
};

const addLoggingToDispatch = store => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return action => {
    console.group(action.type);
    console.log("%c Prev state: ", "color: gray", store.getState());
    console.log("%c Action: ", "color: blue", action);
    const returnValue = rawDispatch(action);
    console.log("%c Next state: ", "color: green", store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const configureStore = () => {
  const preloadedState = loadState();

  const store = createStore(todoApp, preloadedState);

  if (process.env.NODE_ENV !== "production") {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.dispatch = addPromiseSupportToDispatch(store);

  const saveStateLocal = () => {
    saveState({
      todos: store.getState().todos
    });
  };

  store.subscribe(throttle(saveStateLocal, 1000));

  return store;
};

export default configureStore;
