import React, { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { GlobalContext } from "../context/GlobalState";
import Clipboard from "react-clipboard.js";
import { Link } from "react-router-dom";
import { Spinner } from "./Spinner";

export const SavedAccounts = props => {
  const { deleteAccount, loading } = useContext(GlobalContext);
  const { accounts, user, getAccounts } = useContext(GlobalContext);

  useEffect(() => {
    getAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filteredAccounts = accounts.filter(
    account => account.user_id === user.user.id
  );
  const displayAccounts = filteredAccounts.map(account => (
    <div key={uuidv4()}>
      <div>{account.name}</div>
      <div>{account.bank}</div>
      <div>
        {account.acc_no}
        <Clipboard data-clipboard-text={account.acc_no}>copy</Clipboard>
      </div>
      <button onClick={() => deleteAccount(account.id)}>Delete</button>
    </div>
  ));
  return (
    <div>
      {loading === true ? (
        <Spinner />
      ) : displayAccounts.length < 1 ? (
        <div>
          No saved accounts. <Link to="/newkoko">create one? </Link>
        </div>
      ) : (
        displayAccounts
      )}
    </div>
  );
};
