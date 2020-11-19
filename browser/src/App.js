import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import store, { persistor, history } from "./store";
import { ConnectedRouter as Router } from "connected-react-router";
import Dashboard from "./components/Dashboard/index";

import "./App.scss";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={`/dashboard`} component={Dashboard} />
        <Route path={"/"} component={Dashboard} />
      </Switch>
    </Router>
  );
};
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
