import React, { useContext } from "react";
import API_URL from "../helpers/API_CALL";
import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

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
  };
  return (
    <div>
      {!user.user ? (
        ""
      ) : (
        <div>
          <Link to="/newkoko">New</Link>
          <Link to="/savedkoko"> Saved</Link>
          <Link to="/" onClick={() => handleLogoutClick()}>
            {" "}
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};
