import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextState = { ...state };
      action.todos.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};

const reducerByFilter = (filter) => (state = [], action) => {
  if (action.filter !== filter) {
    return state;
  }

  switch (action.type) {
    case "RECEIVE_TODOS":
      return action.todos.map(todo => todo.id);
    default:
      return state;
  }
};

const idsByFilter = combineReducers({
  all: reducerByFilter('all'),
  active: reducerByFilter('active'),
  completed: reducerByFilter('completed')
});

const todos = combineReducers({
  byId,
  idsByFilter
});

export default todos;

export const getVisibleTodos = (state, filter) => {
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.byId[id]);
};