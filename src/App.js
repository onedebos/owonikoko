import React from "react";
import { SavedAccounts } from "./components/SavedAccounts";
import "./App.css";
import { AddAccount } from "./components/AddAccount";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { GlobalProvider } from "./context/GlobalState";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav } from "./components/Nav";

export const App = props => {
  return (
    <GlobalProvider>
      <Router>
        <Switch>
          <Route exact path="/" render={props => <Login {...props} />} />
          <Route
            exact
            path="/newkoko"
            render={props => <AddAccount {...props} />}
          />
          <Route
            exact
            path="/savedkoko"
            render={props => <SavedAccounts {...props} />}
          />
          <Route
            exact
            path="/register"
            render={props => <Register {...props} />}
          />
        </Switch>
        <Nav />
      </Router>
    </GlobalProvider>
  );
};
