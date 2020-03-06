import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GlobalContext } from "../context/GlobalState";
import Clipboard from "react-clipboard.js";
import { Link } from "react-router-dom";
import { capitalize } from "../helpers/helperFunctions";
import { Spinner } from "./Spinner";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import API_URL from "../helpers/API_CALL";
import "../styles/SavedAccounts.css";

export const SavedAccounts = props => {
  const { deleteAccount, loading } = useContext(GlobalContext);
  const { accounts, user, getAccounts } = useContext(GlobalContext);
  const { userIsLoggedIn } = useContext(GlobalContext);
  const [userLoaded, setUserLoaded] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API_URL}/logged_in`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (token) {
          userIsLoggedIn(response.data);
          setUsername(response.data.user.username);
          getAccounts();
          setUserLoaded(true);
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showNotification = () => {
    NotificationManager.success("Copied!", "", 1000);
  };

  let displayAccounts = [];
  if (userLoaded) {
    const filteredAccounts = accounts.filter(
      account => account.user_id === user.user.id
    );
    displayAccounts = filteredAccounts.map(account => (
      <div key={uuidv4()} className="accountWrapper">
        <div className="accountWrapperName">
          <p className="accountName">{account.name}</p>
        </div>
        <div className="accountWrapperBank">{account.bank}</div>
        <div className="accountWrapperAccNo">
          {account.acc_no}
          <Clipboard data-clipboard-text={account.acc_no} className="copyIcon">
            <svg
              className="copyIconSvg"
              onClick={() => showNotification()}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
            >
              <path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z" />
            </svg>
          </Clipboard>
        </div>
        <button className="delete" onClick={() => deleteAccount(account.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="red"
          >
            <path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z" />
          </svg>
        </button>
      </div>
    ));
  }

  return (
    <div>
      <div className="savedAccountsContainer">
        <div className="titleDiv">
          <p className="uNamePar">
            Hi, <span className="uNameSpan">{capitalize(username)} </span>
          </p>
          <h2 className="savedAccountsTitle">Saved accounts.</h2>
        </div>

        {loading === true ? (
          <Spinner />
        ) : displayAccounts.length < 1 && userLoaded ? (
          <div className="accountsWrapper">
            No saved accounts. <Link to="/newkoko">create one? </Link>
          </div>
        ) : (
          <div className="accountsWrapper">{displayAccounts}</div>
        )}
      </div>
    </div>
  );
};
