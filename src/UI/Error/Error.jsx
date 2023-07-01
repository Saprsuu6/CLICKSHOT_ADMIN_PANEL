import React from "react";
import classes from "./Error.module.css";

export const Error = ({ children, ...props }) => {
  return (
    <div {...props} className={classes.Error}>
      {children}
    </div>
  );
};

export default Error;
