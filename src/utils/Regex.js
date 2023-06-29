export default class Validators {
  static validatePasswor(password) {
    let pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$"
    );
    return pattern.exec(password);
  }

  static validateEmail(email) {
    let pattern = new RegExp(
      "^([a-zA-Z\\d_\\-.]+)@([a-zA-Z\\d_\\-.]+)\\.([a-zA-Z]{2,5})$"
    );
    return pattern.exec(email);
  }
}
