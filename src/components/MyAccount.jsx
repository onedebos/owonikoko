import React from "react";
import { DisplayAccounts } from "../container/DisplayAccounts";
import "../styles/SavedAccounts.css";

export const MyAccount = () => {
  return (
    <DisplayAccounts
      title="Your Personal Accounts"
      myAccount={true}
      accType="Personal"
    />
  );
};
