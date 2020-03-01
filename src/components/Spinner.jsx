import React from "react";
import "../styles/Spinner.css";

export const Spinner = () => {
  return (
    <svg className="spinner" viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="black"
        // change to none, spinner by https://codepen.io/supah/pen/BjYLdWs
        strokeWidth="5"
      ></circle>
    </svg>
  );
};
