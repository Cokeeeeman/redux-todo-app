import * as api from './api';
import { normalize } from 'normalizr';
import * as schema from './schema';
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
        response: normalize(todos, schema.todos)
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

export const addTodo = (text) => (dispatch) => {
  dispatch({
    type: 'ADD_TODO_REQUEST'
  });

  return api.addTodo(text).then((todo) => {
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(todo, schema.todo)
    });
  });
};

export const toggleTodo = (id) => (dispatch) => {
  return api.toggleTodo(id).then(todo => {
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response: normalize(todo, schema.todo)
    });
  });
  
};