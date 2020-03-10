import React from "react";

import "./App.css";
import { AddAccount } from "./components/AddAccount";
import { SavedAccounts } from "./components/SavedAccounts";
import { MyAccount } from "./components/MyAccount";
import { Login } from "./auth/Login";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { Register } from "./auth/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav } from "./components/Nav";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={props => <Login {...props} />} />
        <Route path="/new" render={props => <AddAccount {...props} />} />
        <Route path="/all" render={props => <SavedAccounts {...props} />} />
        <Route path="/personal" render={props => <MyAccount {...props} />} />
        <Route
          exact
          path="/register"
          render={props => <Register {...props} />}
        />
        }
      </Switch>
      <NotificationContainer />
      <Nav />
    </Router>
  );
};
