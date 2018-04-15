import uuid from 'uuid/v4';
import * as api from './api';

const receiveTodos = (filter, todos) => {
  return {
    type: 'RECEIVE_TODOS',
    filter,
    todos
  };
};

export const requestTodos = (filter) => {
  return {
    type: 'REQUEST_TODOS',
    filter
  };
};

export const fetchTodos = (filter) => (dispatch) => {
  dispatch(requestTodos(filter));

  return api.fetchTodos(filter).then(todos => {
    dispatch(receiveTodos(filter, todos));
  });
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