import React from "react";
import classes from "./Input.module.css";
import classNames from "classnames";

export const Input = ({ label, inputClassName, ...props }) => {
  return (
    <div>
      <label className={classes.Label}>{label}</label>
      <input {...props} className={classNames(classes.Input, inputClassName)} />
    </div>
  );
};

export default Input;
