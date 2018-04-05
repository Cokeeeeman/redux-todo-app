import todoApp from "./reducers/todoApp";
import { createStore } from "redux";
import { loadState, saveState } from './util/localStorage';

const preloadedState = loadState();

const store = createStore(
  todoApp,
  preloadedState
);

store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  });
});

export default store;
