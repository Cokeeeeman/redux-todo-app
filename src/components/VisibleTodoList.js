import React from 'react';
import TodoList from './TodoList';
import { connect } from 'react-redux';
import { toggleTodo } from '../ActionCreators';

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

const mapStateToProps = (state, ownProps) => {
  console.log("ownProps.filter: ", ownProps.filter);
  return {
    todos: filterTodos(state.todos, ownProps.filter)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  };
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;