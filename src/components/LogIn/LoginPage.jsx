import React, { Component } from "react";
import classes from "../AuthorizationStyles.module.css";
import Input from "../../UI/Input/Input";
import Error from "../../UI/Error/Error";
import Validators from "../../utils/Validators";
import { useNavigate } from "react-router-dom";
import Authorization from "../../APIs/Authorization";
import Errors from "../../utils/Errors";
import classNames from "classnames";
import { localStorageKeys } from "../../utils/LocalStorageKeys";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      rememberMe: false,
      password: "",
      validationError: "",
      passwordShown: false,
      serverError: "",
    };

    if (localStorage.getItem(localStorageKeys.REMEMBER_ME) != null) {
      this.logIn();
    }
  }

  //#region handlers
  handleLoginChange = (event) => {
    this.setState({
      login: event.target.value,
    });
    this.validate(event.target.value, Validators.validateLogin);
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
    this.validate(event.target.value, Validators.validatePassword);
  };

  handleRememberMe = (event) => {
    this.setState({
      rememberMe: event.target.value,
    });
    // save uathorisate user state
    if (this.state.login.length > 0 && this.state.password.length > 0) {
      console.log(this.state.rememberMe);
      localStorage.setItem(localStorageKeys.REMEMBER_ME, event.target.value);
      localStorage.setItem(localStorageKeys.USER_LOGIN, this.state.login);
      localStorage.setItem(localStorageKeys.USER_PASSWORD, this.state.password);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      this.validate(this.state.password, Validators.validatePassword) &&
      this.validate(this.state.login, Validators.validateLogin)
    ) {
      // save uathorisate user state
      localStorage.setItem(localStorageKeys.USER_LOGIN, this.state.login);
      localStorage.setItem(localStorageKeys.USER_PASSWORD, this.state.password);

      //logIn();
    }
  };
  //#endregion

  logIn() {
    let response = Authorization.singIn(this.state.login, this.state.password);
    console.log(response);
    if (response.includes("0")) this.props.navigate(`/mainPage`);
    else {
      this.setState({
        serverError: Errors.authorization(response),
      });
    }
  }

  validate = (fireld, validator) => {
    this.setState({
      validationError: validator(fireld),
    });

    if (this.state.validationError.trim() !== "") return false;
    else return true;
  };

  render() {
    return (
      <div>
        <h1 className={classes.Title}>Login Page</h1>
        <form onSubmit={this.handleSubmit}>
          <div className={classes.InputContainer}>
            <Input
              type="text"
              label={"Login:"}
              value={this.state.login}
              placeholder="Field for login"
              onChange={this.handleLoginChange}
              required
            />
          </div>
          <div className={classes.InputContainer}>
            <Input
              type={this.state.passwordShown ? "text" : "password"}
              label={"Password:"}
              placeholder="Field for Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              required
            />
            <div
              onClick={() => this.setPasswordShown(!this.state.passwordShown)}
              className={
                !this.state.passwordShown
                  ? classes.ShowPassword
                  : classes.HidePassword
              }
            ></div>
          </div>
          <div className={classes.InputContainer}>
            <Input
              inputClassName={classes.CheckBox}
              type={"checkbox"}
              value={this.state.rememberMe}
              label={"Remember me"}
              onChange={this.state.handleRememberMe}
            />
          </div>
          {this.state.validationError && (
            <Error>{this.state.validationError}</Error>
          )}
          {this.state.serverError.trim() !== "" && (
            <Error>{this.state.serverError}</Error>
          )}
          <p
            className={classNames(classes.FogotPassword, classes.AuthLink)}
            onClick={() => {
              this.props.navigate("/forgotPassword");
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
            this.props.navigate("/singIn");
          }}
        >
          Haven't an a page
        </p>
      </div>
    );
  }
}

const Point = () => {
  const navigate = useNavigate();
  return <LoginPage navigate={navigate} />;
};

export default Point;
