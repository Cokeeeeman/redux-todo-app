import React from 'react';
import TodoList from './TodoList';
import { connect } from 'react-redux';
import { toggleTodo } from '../ActionCreators';
import { withRouter } from 'react-router-dom';

const filterTodos = (todos, filter) => {
  switch (filter) {
    case "all":
      return todos;
    case "active":
      return todos.filter(t => !t.completed);
    case "completed":
      return todos.filter(t => t.completed);
    default:
      return todos;
  }
};

const mapStateToProps = (state, { match }) => {
  return {
    todos: filterTodos(state.todos, match.params.filter || 'all')
  };
};

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList;