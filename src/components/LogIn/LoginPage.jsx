import React, { useState } from "react";
import classes from "../AuthorizationStyles.module.css";
import Input from "../../UI/Input/Input";
import ValidationError from "../../UI/Error/Error";
import Validators from "../../utils/Validators";
import { useNavigate } from "react-router-dom";
import Authorization from "../../APIs/Authorization";
import Errors from "../../utils/Errors";
import classNames from "classnames";

const LoginPage = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

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

  const validate = (fireld, validator) => {
    setValidationError(validator(fireld));
    if (validationError.trim() !== "") return false;
    else return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      validate(password, Validators.validatePassword) &&
      validate(login, Validators.validateLogin)
    ) {
      let response = Authorization.singIn(login, password);
      console.log(response);

      // fix that
      if (response.includes("0")) navigate(`/mainPage`);
      else {
        console.log("Imitation of server error");
        setSertverError(Errors.authorization(response));
      }
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
        <p
          className={classNames(classes.FogotPassword, classes.AuthLink)}
          onClick={() => {
            navigate("/forgotPassword");
          }}
        >
          Forgot password
        </p>
        <div className={classes.ForSubmit}>
          <button type="submit" className={classes.Submit}>
            Log in
          </button>
        </div>
      </form>
      <p
        className={classNames(classes.BottomLink, classes.AuthLink)}
        onClick={() => {
          navigate("/singIn");
        }}
      >
        Haven't an a page
      </p>
    </div>
  );
};

export default LoginPage;
