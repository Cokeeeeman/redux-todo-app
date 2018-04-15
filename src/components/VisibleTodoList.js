import React, { Component } from "react";
import TodoList from "./TodoList";
import FetchError from "./FetchError";
import { connect } from "react-redux";
import * as actions from "../ActionCreators";
import { withRouter } from "react-router-dom";
import { getVisibleTodos, getFetchingStatus, getErrorMessage } from "../reducers";

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchTodos();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchTodos();
    }
  }

  fetchTodos() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, todos, isFetching, errorMessage } = this.props;
    if (isFetching && todos.length === 0) {
      return <p>Loading...</p>;
    }
    if (errorMessage && todos.length === 0) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchTodos() }
        />
      );
    }
    return (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getFetchingStatus(state, filter),
    errorMessage: getErrorMessage(state, filter),
    filter
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToProps, actions)(VisibleTodoList)
);

export default VisibleTodoList;
