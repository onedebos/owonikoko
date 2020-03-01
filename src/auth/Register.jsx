import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
import API_URL from "../helpers/API_CALL";

export const Register = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    axios
      .post(
        `${API_URL}/registrations`,
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
          storeUser(response.data);
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value.toLowerCase())}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password: </label>

          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <div>
          <input type="checkbox" onClick={() => showPasswordToggler()} />
          <label htmlFor="see password">Show password</label>
        </div>
        <button type="submit">Sign up</button>
        {error.length > 0 ? error : ""}
      </form>
    </div>
  );
};
