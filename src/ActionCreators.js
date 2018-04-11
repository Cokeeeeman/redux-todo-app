import uuid from 'uuid/v4';

export const receiveTodos = (filter, todos) => {
  return {
    type: 'RECEIVE_TODOS',
    filter,
    todos
  };
};

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