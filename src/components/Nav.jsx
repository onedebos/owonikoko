import React, { useContext } from "react";
import API_URL from "../helpers/API_CALL";
import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import "../styles/Nav.css";

export const Nav = props => {
  const { storeUser, user } = useContext(GlobalContext);
  const handleLogoutClick = () => {
    axios
      .delete(`${API_URL}/logout`, {
        withCredentials: true
      })
      .then(() => {
        storeUser({});
      })
      .catch(error => error);
    storeUser({});
    localStorage.removeItem("token");
  };
  return (
    <div className="navContainer">
      {!user.user ? (
        ""
      ) : (
        <div className="navWrap">
          <div className="navLinkWrap">
            <Link to="/newkoko" className="nav">
              New
            </Link>
          </div>
          <div className="navLinkWrap">
            <Link to="/savedkoko" className="nav">
              {" "}
              Saved
            </Link>
          </div>
          <div className="navLinkWrap">
            <Link to="/" className="nav" onClick={() => handleLogoutClick()}>
              {" "}
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
