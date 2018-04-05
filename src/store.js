import todoApp from "./reducers/todoApp";
import { createStore } from "redux";
import { loadState, saveState } from './util/localStorage';
import throttle from 'lodash/throttle';

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

export default store;
