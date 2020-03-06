import React, { useEffect, useState } from "react";
import { SavedAccounts } from "./components/SavedAccounts";
import "./App.css";
import { AddAccount } from "./components/AddAccount";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import axios from "axios";
import { Spinner } from "./components/Spinner";
import { GlobalProvider } from "./context/GlobalState";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Nav } from "./components/Nav";
import API_URL from "./helpers/API_CALL";

// if not loggedin is false redirect to login

export const App = props => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API_URL}/logged_in`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setIsLoggedIn(response.data.logged_in);
        setLoaded(true);
      });
  }, []);

  return (
    <div>
      {loaded === false ? (
        <Spinner />
      ) : (
        <GlobalProvider>
          <Router>
            <Switch>
              <Route exact path="/" render={props => <Login {...props} />} />
              <Route
                path="/newkoko"
                render={props =>
                  isLoggedIn === true ? (
                    <AddAccount {...props} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                path="/savedkoko"
                render={props =>
                  isLoggedIn === true ? (
                    <SavedAccounts {...props} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/register"
                render={props => <Register {...props} />}
              />
              }
            </Switch>
            <Nav />
          </Router>
        </GlobalProvider>
      )}
    </div>
  );
};
