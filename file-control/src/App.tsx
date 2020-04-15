import React from "react";
import { Provider } from 'react-redux';
import { ConnectedRouter } from "connected-react-router";
import Root from "./container/Root";
import configureStore, { history } from "./configureStore/ConfigureStore";
import "./App.scss";

function App() {
  return (
    <Provider store={configureStore(undefined)}>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
