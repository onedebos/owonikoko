import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import "../styles/Login.css";
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
    const body = {
      username: username.toLowerCase(),
      password: password
    };
    console.log(body);
    e.preventDefault();
    axios
      .post(
        `${API_URL}/sessions`,
        {
          body
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
    <div className="LoginContainer">
      <form onSubmit={handleSubmit}>
        <div className="LoginForm">
          <div className="aboutApp">
            <p>OwoNiKoko</p>
            <small>Never forget account numbers again!</small>
          </div>
          <div className="userField">
            <label htmlFor="username">Username: </label>
            <div>
              <input
                type="text"
                value={username}
                className="userInput"
                onChange={e => setUsername(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="userField">
            <label htmlFor="password">Password: </label>
            <div>
              <input
                className="userInput"
                id="password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              ></input>
            </div>
          </div>
          <div className="passwordBox">
            <input
              className="checkPassword"
              type="checkbox"
              onClick={() => showPasswordToggler()}
            />
            <span className="myCheckbox"></span>
            <label htmlFor="see password">show password</label>
          </div>
          <button type="submit" className="submit">
            Sign in
          </button>
          <div className="registerDiv">
            No account?,
            <Link to="/register" className="register">
              &nbsp;Sign up!
            </Link>
          </div>

          {error.length > 0 ? error : ""}
        </div>
      </form>
    </div>
  );
};
