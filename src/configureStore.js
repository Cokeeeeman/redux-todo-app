import todoApp from "./reducers";
import { createStore } from "redux";
import { loadState, saveState } from './util/localStorage';
import throttle from 'lodash/throttle';

const configureStore = () => {
  const preloadedState = loadState();

  const store = createStore(
    todoApp,
    preloadedState
  );

  const saveStateLocal = () => {
    saveState({
      todos: store.getState().todos
    });
  };

  store.subscribe(throttle(saveStateLocal, 1000));

  return store;
}

export default configureStore;
