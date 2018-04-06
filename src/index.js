import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./configureStore";
import Root from './components/Root';

const store = configureStore();

const render = () => {
  ReactDOM.render(
    <Root store={store} />,
    document.getElementById("root")
  );
};

store.subscribe(render);

render();
