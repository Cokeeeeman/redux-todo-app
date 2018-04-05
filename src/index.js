import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import TodoApp from "./components/TodoApp";

import store from "./store";

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <TodoApp />
    </Provider>,
    document.getElementById("root")
  );
};

store.subscribe(render);

render();
