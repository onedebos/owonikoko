import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
import { Auth } from "./AuthForm";
import { NotificationManager } from "react-notifications";
import "../styles/Login.css";

import API_URL from "../helpers/API_CALL";

export const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInState, setLoggedInState] = useState();
  const { storeUser } = useContext(GlobalContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      props.history.push("/all");
    }
  }, []);

  const handleLogin = data => {
    props.history.push("/all");
  };
  const handleSuccessfulAuth = data => {
    handleLogin(data);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoggedInState("logging in");

    axios
      .post(
        `${API_URL}/sessions`,
        {
          username: username.toLowerCase(),
          password: password
        },
        { withCredentials: false }
      )
      .then(response => {
        if (response.data.status === "created") {
          setLoggedInState("logged in");
          storeUser(response.data);
          localStorage.setItem("token", response.data.jwt);
          handleSuccessfulAuth(response.data);
        }
      })
      .catch(() => {
        NotificationManager.error(
          "The username or passowrd you have entered is incorrect."
        );
        setLoggedInState("logged in");
      });
  };

  return (
    <Auth
      loggedInState={loggedInState}
      handleSubmit={handleSubmit}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      accountStatus="Don't have an account?"
      buttonText="Sign up"
      buttonLink="/register"
      buttonToClick="Sign in"
    />
  );
};
