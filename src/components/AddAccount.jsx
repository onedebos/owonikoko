import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { GlobalContext } from "../context/GlobalState";
import naijaBanks from "../helpers/NigerianBanks";

export const AddAccount = props => {
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [accountNo, setaccountNo] = useState("0");
  const [category, setCategory] = useState("");
  const { addAccount, user } = useContext(GlobalContext);

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          ></input>
          <div>
            <label htmlFor="bank">
              Bank:
              <select
                value={bank}
                required
                onChange={e => setBank(e.target.value)}
              >
                {displayNaijaBanks}
              </select>
            </label>
            <div>
              <label htmlFor="accountNo">
                Account number:
                <input
                  required
                  type="text"
                  value={accountNo}
                  pattern="\d{10}"
                  onChange={e => setaccountNo(e.target.value)}
                  minLength="10"
                  maxLength="10"
                />
              </label>
            </div>
            <div>
              <label htmlFor="accountNo">
                Is this your account?:
                <select
                  required
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option></option>
                  <option>yes</option>
                  <option>no</option>
                </select>
              </label>
            </div>
            <button type="submit">Add account number jo!</button>
          </div>
        </div>
      </form>
    </div>
  );
};
