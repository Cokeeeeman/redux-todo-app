import React, { Component } from "react";
import TodoList from "./TodoList";
import { connect } from "react-redux";
import * as actions from "../ActionCreators";
import { withRouter } from "react-router-dom";
import { getVisibleTodos, getFetchingStatus } from "../reducers";

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
    const { filter, requestTodos, fetchTodos } = this.props;
    requestTodos(filter);
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, todos, isFetching } = this.props;
    if (isFetching && todos.length === 0) {
      return <p>Loading...</p>;
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
    filter
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToProps, actions)(VisibleTodoList)
);

export default VisibleTodoList;
