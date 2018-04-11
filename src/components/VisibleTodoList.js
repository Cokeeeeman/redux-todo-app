import React, { Component } from "react";
import TodoList from "./TodoList";
import { connect } from "react-redux";
import * as actions from "../ActionCreators";
import { withRouter } from "react-router-dom";
import { getVisibleTodos } from "../reducers";
import { fetchTodos } from "../api";

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
    const { filter, receiveTodos } = this.props;
    fetchTodos(filter).then(todos => {
      receiveTodos(filter, todos);
    });
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return (
      <TodoList
        {...rest}
        onTodoClick={toggleTodo}
      />
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    filter
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToProps, actions)(VisibleTodoList)
);

export default VisibleTodoList;
