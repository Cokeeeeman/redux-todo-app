import React from 'react';
import TodoList from './TodoList';
import { connect } from 'react-redux';
import { toggleTodo } from '../ActionCreators';
import { withRouter } from 'react-router-dom';
import { getVisibleTodos } from '../reducers';

const mapStateToProps = (state, { match }) => {
  return {
    todos: getVisibleTodos(state, match.params.filter || 'all')
  };
};

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList;