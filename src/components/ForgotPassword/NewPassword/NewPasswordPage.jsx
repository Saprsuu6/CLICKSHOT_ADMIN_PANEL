import React, { forwardRef, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../../AuthorizationStyles.module.css";
import Validators from "../../../utils/Validators";
import Input from "../../../UI/Input/Input";
import classNames from "classnames";
import Error from "../../../UI/Error/Error";
import InputWithForward from "../../../UI/Input/InputWithForward";

export const NewPasswordPage = () => {
  const navigate = useNavigate();

  const passwordRef = useRef();
  const showPasswordRef = useRef();
  const repeatPasswordRef = useRef();
  const showRpPasswordRef = useRef();
  const submitBtnRef = useRef();

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [validationError, setValidationError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [rpPasswordShown, setRpPasswordShown] = useState(false);
  const [serverError, setSertverError] = useState("");

  //#region handlers
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validate(event.target.value, null, Validators.validatePassword);
    validate(
      event.target.value,
      repeatPassword,
      Validators.validateRepeatPassword
    );
  };

  const handleRpPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
    validate(password, event.target.value, Validators.validateRepeatPassword);
    validate(password, null, Validators.validatePassword);
  };
  //#endregion

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      validate(password, null, Validators.validatePassword) &&
      validate(password, repeatPassword, Validators.validateRepeatPassword)
    ) {
      // TODO add new password to back-end
      navigate("/logIn");
    }
  };

  // console.log(event.keyCode);
  // if (event.keyCode === 13) {
  //   nextElementFocus(document.activeElement.tabIndex);
  // }

  function nextElementFocus(tabIndex) {
    switch (tabIndex) {
      case 1:
        passwordRef.current.focus();
        break;
      case 2:
        showPasswordRef.current.focus();
        break;
      case 3:
        repeatPasswordRef.current.focus();
        break;
      case 4:
        showRpPasswordRef.current.focus();
        break;
      case 5:
        alert("you clicked submit button");
        break;
      default:
        return;
    }
  }

  const validate = (password, rpPassword, validator) => {
    setValidationError(validator(password, rpPassword));
    if (validationError.trim() !== "") return false;
    else return true;
  };

  return (
    <div>
      <h1 className={classes.Title}>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.InputContainer}>
          <Input
            type={passwordShown ? "text" : "password"}
            label={"Password:"}
            placeholder="Field for Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <div
            onClick={() => setPasswordShown(!passwordShown)}
            className={
              !passwordShown ? classes.ShowPassword : classes.HidePassword
            }
          ></div>
        </div>
        <div className={classes.InputContainer}>
          <Input
            type={rpPasswordShown ? "text" : "password"}
            label={"Repeat passwod:"}
            placeholder="Field for repeat password"
            onChange={handleRpPasswordChange}
            required
          />
          <div
            onClick={() => setRpPasswordShown(!rpPasswordShown)}
            className={
              !rpPasswordShown ? classes.ShowPassword : classes.HidePassword
            }
          ></div>
        </div>
        <div className={classes.InputContainer}></div>
        {validationError && <Error>{validationError}</Error>}
        {serverError.trim() !== "" && <Error>{serverError}</Error>}
        <div className={classes.ForSubmit}>
          <button type="submit" className={classes.Submit}>
            Sing in
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPasswordPage;
