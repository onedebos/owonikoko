import React from "react";
import "../styles/Spinner.css";

export const Spinner = () => {
  return (
    <div className="spinnerDiv">
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          //spinner by https: //codepen.io/supah/pen/BjYLdWs
        ></circle>
      </svg>
    </div>
  );
};
