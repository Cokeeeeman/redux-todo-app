import uuid from 'uuid/v4';
import * as api from './api';
import { getFetchingStatus, getErrorMessage } from './reducers';

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getFetchingStatus(getState(), filter)) {
    return Promise.resolve();
  }
  
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  });

  return api.fetchTodos(filter).then(
    todos => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        todos
      });
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        message: error.message || 'Error fetching todos',
        filter
      });
    }
  );
}

export const addTodo = (text) => {
  return {
    id: uuid(),
    type: "ADD_TODO",
    text
  }
};

export const toggleTodo = (id) => {
  return {
    type: "TOGGLE_TODO",
    id
  };
};