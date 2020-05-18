import React from "react";
import { Link } from "react-router-dom";
import { showPasswordToggler } from "../helpers/helperFunctions";
import { Spinner } from "../components/Spinner";
import "../styles/Login.css";

export const Auth = ({
  loggedInState,
  handleSubmit,
  username,
  setUsername,
  password,
  setPassword,
  buttonText,
  buttonLink,
  accountStatus,
  buttonToClick
}) => {
  return (
    <div className="LoginContainer">
      <div className="largerScreenGrid">
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
              {loggedInState === "logging in" ? (
                <svg className="spin" viewBox="0 0 50 50">
                  <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                  ></circle>
                </svg>
              ) : (
                ""
              )}
              {buttonToClick}
            </button>
            <div className="registerDiv">
              {accountStatus}&nbsp;
              <Link to={buttonLink} className="register">
                {buttonText}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
