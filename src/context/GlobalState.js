import React, { createContext, useReducer } from "react";
import axios from "axios";
import API_URL from "../helpers/API_CALL";
import { NotificationManager } from "react-notifications";
import AppReducer from "./AppReducer";

// initial state
const initalState = {
  accounts: [],
  error: null,
  user: {},
  loading: true
};

// Create context
export const GlobalContext = createContext(initalState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initalState);

  // Actions
  async function getAccounts() {
    try {
      const response = await axios.get(`${API_URL}/accounts`);
      dispatch({
        type: "GET_ACCOUNTS",
        payload: response.data
      });
    } catch (err) {}
  }

  async function storeUser(data) {
    await data;
    dispatch({
      type: "STORE_USER",
      payload: data
    });
    console.log(data);
  }

  function userIsLoggedIn(data) {
    dispatch({
      type: "STORE_USER",
      payload: data
    });
  }

  async function deleteAccount(id) {
    try {
      await axios.delete(`${API_URL}/accounts/${id}`);
      dispatch({
        type: "DELETE_ACCOUNT",
        payload: id
      });
      NotificationManager.error("Deleted!", "", 1500);
    } catch (err) {}
  }

  async function addAccount(transaction) {
    try {
      await axios.post(`${API_URL}/accounts`, transaction);
      dispatch({
        type: "ADD_ACCOUNT",
        payload: transaction
      });
    } catch (err) {}
  }

  return (
    <GlobalContext.Provider
      value={{
        accounts: state.accounts,
        deleteAccount,
        addAccount,
        getAccounts,
        loading: state.loading,
        storeUser,
        user: state.user,
        userIsLoggedIn
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
