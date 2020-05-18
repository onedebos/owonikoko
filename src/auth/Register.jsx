import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
import { Auth } from "./AuthForm";
import API_URL from "../helpers/API_CALL";
import { NotificationManager } from "react-notifications";

export const Register = props => {
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
        `${API_URL}/registrations`,
        {
          username: username.toLowerCase(),
          password: password
        },
        { withCredentials: false }
      )
      .then(response => {
        if (response.data.status === "created") {
          storeUser(response.data);
          localStorage.setItem("token", response.data.jwt);
          handleSuccessfulAuth(response.data);
        }
      })
      .catch(() => {
        NotificationManager.error("There was a problem signing you up. ");
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
      buttonText="Sign in"
      buttonToClick="Sign up"
      buttonLink="/"
      accountStatus="Already have an account?"
    />
  );
};
