import React, { useState } from "react";
import classes from "./LoginPage.module.css";
import Input from "../../UI/Input/Input";
import ValidationError from "../../UI/Error/Error";
import Validators from "../../utils/Regex";
import { useNavigate } from "react-router-dom";
import Authorization from "../../APIs/Authorization";
import Errors from "../../utils/Errors";

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [serverError, setSertverError] = useState("");

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validatePassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validatePassword(password) && login.length > 0) {
      let response = Authorization.singIn(login, password);
      console.log(response);

      if (response.contains("0")) navigate(`/mainPage`);
      else {
        console.log("Imitation of server error");
        setSertverError(Errors.authorization(response));
      }
    }
  };

  const validatePassword = (password) => {
    console.log(password);
    if (Validators.validatePasswor(password) == null) {
      setValidationError(
        "Password not valid. Password have to contains: One big latter, 0-9, @$!%*?&"
      );
      return false;
    }

    setValidationError("");
    return true;
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
        {serverError !== "" && <ValidationError>{serverError}</ValidationError>}
        <div className={classes.ForSubmit}>
          <button type="submit" className={classes.Submit}>
            Log in
          </button>
        </div>
      </form>
      <p
        className={classes.HaventAnAPage}
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
