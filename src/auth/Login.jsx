import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import API_URL from "../helpers/API_CALL";

export const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, storeUser } = useContext(GlobalContext);

  const handleLogin = data => {
    props.history.push("/savedkoko");
  };
  const handleSuccessfulAuth = data => {
    handleLogin(data);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(
        `${API_URL}/sessions`,
        {
          username,
          password
        },
        {
          withCredentials: true
        }
      )
      .then(response => {
        if (response.data.status === "created") {
          console.log(response.data);
          storeUser(response.data);
          handleSuccessfulAuth(response.data);
          console.log(user);
        }
      })
      .catch(() =>
        setError("The username or passowrd you have entered is incorrect.")
      );
  };

  const showPasswordToggler = () => {
    const passwordField = document.getElementById("password");
    if (passwordField.type === "text") {
      passwordField.type = "password";
    } else {
      passwordField.type = "text";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password: </label>

          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <div>
          <input type="checkbox" onClick={() => showPasswordToggler()} />
          <label htmlFor="see password">Show password</label>
        </div>
        <button type="submit">Sign in</button>
        <div>
          <Link to="/register">Register</Link>
        </div>

        {error.length > 0 ? error : ""}
      </form>
    </div>
  );
};
