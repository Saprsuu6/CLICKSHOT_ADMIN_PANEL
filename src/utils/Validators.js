let regularForPassord =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$";

let regularForEmail =
  "^([a-zA-Z\\d_\\-.]+)@([a-zA-Z\\d_\\-.]+)\\.([a-zA-Z]{2,5})$";

export default class Validators {
  static validatePassword(password) {
    if (password.length <= 0) return "Password required";
    else if (new RegExp(regularForPassord).exec(password) == null)
      return "Password not valid. Password have to contains: One big latter, 0-9, @$!%*?&";
    else return "";
  }

  static validateEmail(email) {
    if (email.length <= 0) return "Email required";
    else if (new RegExp(regularForEmail).exec(email) == null)
      return "Email not valid";
    else return "";
  }

  static validateLogin(login) {
    if (login.length <= 0) return "Login required";
    else return "";
  }
}
