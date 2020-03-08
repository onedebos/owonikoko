import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import API_URL from "../helpers/API_CALL";

export const Register = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInState, setLoggedInState] = useState();
  const [error, setError] = useState("");
  const { storeUser } = useContext(GlobalContext);

  const handleLogin = data => {
    props.history.push("/savedkoko");
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
        {
          withCredentials: true
        }
      )
      .then(response => {
        if (response.data.status === "created") {
          storeUser(response.data);
          localStorage.setItem("token", response.data.jwt);
          handleSuccessfulAuth(response.data);
        }
      })
      .catch(() => setError("There was a problem signing you up."));
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
      {loggedInState === "logging in" ? <Spinner /> : ""}
      <div>
        <div className="largerScreenGrid">
          <div className="largerScreenImg">
            <img
              className="mainImg"
              src="https://images.unsplash.com/photo-1508002366005-75a695ee2d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=617&q=80"
              alt="img from unsplash"
            />
          </div>
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
                Sign up
              </button>
              <div className="registerDiv">
                Already have an account?&nbsp;
                <Link to="/" className="register">
                  Sign in!
                </Link>
              </div>

              {error.length > 0 ? error : ""}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
