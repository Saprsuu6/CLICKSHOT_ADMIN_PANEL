import React, { useState } from "react";
import classes from "../AuthorizationStyles.module.css";
import { useNavigate } from "react-router-dom";
import Input from "../../UI/Input/Input";
import Error from "../../UI/Error/Error";

export const ConfirmCodePage = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [serverError, setSertverError] = useState("");

  //#region handlers
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO change to servlet of send code
    //let response = Authorization.logIn(login, password, email);
    //console.log(response);
    //if (response.includes("0")) navigate(`/mainPage`);
    //else setSertverError(Errors.authorization(response));
  };
  //#endregion

  return (
    <div>
      <h1 className={classes.Title2}>Login Page</h1>
      <p className={classes.Title3}>
        Enter code what has been send on your email
      </p>
      <form>
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
