import React from "react";
import classes from "./Input.module.css";

export const Input = ({ label, ...props }) => {
  return (
    <div>
      <label className={classes.Label}>{label}</label>
      <input {...props} className={classes.Input} />
    </div>
  );
};

export default Input;
