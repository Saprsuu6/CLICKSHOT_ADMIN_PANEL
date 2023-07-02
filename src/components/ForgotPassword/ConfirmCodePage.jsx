import React, { useState } from "react";
import classes from "../AuthorizationStyles.module.css";
import { useNavigate } from "react-router-dom";
import Input from "../../UI/Input/Input";
import Error from "../../UI/Error/Error";
import Authorization from "../../APIs/Authorization";
import { localStorageKeys } from "../../utils/LocalStorageKeys";

export const ConfirmCodePage = () => {
  //checkPressedEmailLink();

  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [serverError, setSertverError] = useState("");

  function checkPressedEmailLink() {
    let userLogin = localStorage.getItem(localStorageKeys.USER_LOGIN);
    setInterval(() => {
      let response = Authorization.checkPressedEmailLink(userLogin);
      goNext(response);
    }, 5000);
  }

  //#region handlers
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO change to servlet of send code
    let userLogin = localStorage.getItem(localStorageKeys.USER_LOGIN);
    let response = Authorization.sendCodeFToEmail(userLogin, code);
    goNext(response);
  };
  //#endregion

  const goNext = (response) => {
    // change route
    localStorage.setItem(localStorageKeys.EMAIL_CODE, code);
    console.log(response);
    if (response.includes("0")) navigate(`/mainPage`);
    else setSertverError(Error.authorization(response));
  };

  return (
    <div>
      <h1 className={classes.Title2}>Login Page</h1>
      <p className={classes.Title3}>
        Enter code what has been send on your email
      </p>
      <form onSubmit={handleSubmit}>
        <div className={classes.InputContainer}>
          <Input
            type="text"
            label={"Code:"}
            value={code}
            placeholder="Field for code"
            onChange={handleCodeChange}
            required
          />
        </div>
        {serverError.trim() !== "" && <Error>{serverError}</Error>}
        <div className={classes.ForSubmit}>
          <button type="submit" className={classes.Submit}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmCodePage;
