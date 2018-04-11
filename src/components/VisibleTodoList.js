import React, { Component } from "react";
import TodoList from "./TodoList";
import { connect } from "react-redux";
import { toggleTodo } from "../ActionCreators";
import { withRouter } from "react-router-dom";
import { getVisibleTodos } from "../reducers";
import { fetchTodos } from "../api";

class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos => {
      console.log(this.props.filter, todos);
    });
  }

  componentDidUpdate() {
    fetchTodos(this.props.filter).then(todos => {
      console.log(this.props.filter, todos);
    });
  }

  render() {
    return <TodoList {...this.props} />;
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
  connect(mapStateToProps, { onTodoClick: toggleTodo })(VisibleTodoList)
);

export default VisibleTodoList;
