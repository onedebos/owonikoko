import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { GlobalContext } from "../context/GlobalState";
import naijaBanks from "../helpers/NigerianBanks";
import axios from "axios";
import API_URL from "../helpers/API_CALL";
import "../styles/AddAccount.css";

export const AddAccount = props => {
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [accountNo, setaccountNo] = useState("");
  const [category, setCategory] = useState("");
  const { addAccount, user } = useContext(GlobalContext);

  const { userIsLoggedIn } = useContext(GlobalContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${API_URL}/logged_in`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          userIsLoggedIn(response.data);
        });
    } else {
      props.history.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayNaijaBanks = naijaBanks.map(naijaBank => (
    <option key={uuidv4()}>{naijaBank.name}</option>
  ));

  const handleSubmit = e => {
    e.preventDefault();
    const newAccount = {
      name,
      bank,
      acc_no: accountNo,
      category,
      user_id: user.user.id
    };
    addAccount(newAccount);
    props.history.push("/savedkoko");
  };
  return (
    <div className="savedAccountsContainer">
      <div className="titleDiv">
        <h2 className="savedAccountsTitle">Add account.</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="accountsWrapper">
          <div className="wrapField">
            <div className="addUserField">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
            </div>
            <div>
              <input
                className="addName"
                placeholder="enter an account name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="wrapField">
            <div>
              <label htmlFor="bank">
                <strong>Bank</strong>
              </label>
            </div>

            <select
              value={bank}
              required
              onChange={e => setBank(e.target.value)}
            >
              {displayNaijaBanks}
            </select>
          </div>
          <div className="wrapField">
            <div>
              <label htmlFor="accountNo">
                <strong>Account number</strong>
                <div>
                  <input
                    className="addName"
                    placeholder="1234567890"
                    required
                    type="text"
                    value={accountNo}
                    pattern="\d{10}"
                    onChange={e => setaccountNo(e.target.value)}
                    minLength="10"
                    maxLength="10"
                  />
                </div>
              </label>
              <small className="numHelp">enter a 10 digit account number</small>
            </div>
          </div>
          <div className="wrapField">
            <div>
              <label htmlFor="accountNo">
                <strong>Is this your personal account?</strong>
                <div>
                  <select
                    required
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option></option>
                    <option>yes</option>
                    <option>no</option>
                  </select>
                </div>
              </label>
            </div>
          </div>
          <button type="submit" className="submit">
            Oya add it!
          </button>
        </div>
      </form>
    </div>
  );
};
