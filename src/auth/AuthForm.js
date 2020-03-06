import React from "react";
import { Link } from "react-router-dom";

export const AuthForm = (
  handleSubmit,
  username,
  setUsername,
  password,
  setPassword,
  showPasswordToggler,
  submitText,
  link,
  linkText,
  error
) => {
  return (
    <div className="LoginContainer">
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
                {submitText}
              </button>
              <div className="registerDiv">
                No account?&nbsp;
                <Link to={link} className="register">
                  {linkText}
                </Link>
              </div>

              {/* {error.length > 0 ? error : ""} */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
