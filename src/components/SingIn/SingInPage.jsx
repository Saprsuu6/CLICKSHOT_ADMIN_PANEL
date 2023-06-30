import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validators from "../../utils/Validators";
import classes from "../AuthorizationStyles.module.css";
import Input from "../../UI/Input/Input";
import ValidationError from "../../UI/Error/Error";
import classNames from "classnames";

export const SingInPage = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [validationError, setValidationError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [serverError, setSertverError] = useState("");

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
    validate(event.target.value, Validators.validateLogin);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validate(event.target.value, Validators.validatePassword);
  };

  const handleEmailhange = (event) => {
    setEmail(event.target.value);
    validate(event.target.value, Validators.validateEmail);
  };

  const validate = (fireld, validator) => {
    setValidationError(validator(fireld));
    if (validationError.trim() !== "") return false;
    else return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      validate(email, Validators.validateEmail) &&
      validate(password, Validators.validatePassword) &&
      validate(login, Validators.validateLogin)
    ) {
      // TODO smth
    }
  };

  return (
    <div>
      <h1 className={classes.Title}>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.InputContainer}>
          <Input
            type="text"
            label={"Login:"}
            value={login}
            placeholder="Field for login"
            onChange={handleLoginChange}
            required
          />
        </div>
        <div className={classes.InputContainer}>
          <Input
            type="email"
            label={"Email:"}
            value={email}
            placeholder="Field for email"
            onChange={handleEmailhange}
            required
          />
        </div>
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
        {validationError && (
          <ValidationError>{validationError}</ValidationError>
        )}
        {serverError.trim() !== "" && (
          <ValidationError>{serverError}</ValidationError>
        )}
        <div className={classes.ForSubmit}>
          <button type="submit" className={classes.Submit}>
            Sing in
          </button>
        </div>
      </form>
      <p
        className={classNames(classes.BottomLink, classes.AuthLink)}
        onClick={() => {
          navigate("/logIn");
        }}
      >
        Have a page
      </p>
    </div>
  );
};

export default SingInPage;
