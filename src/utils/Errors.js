export default class Errors {
  static authorization(response) {
    if (response.contains("0")) return "Access allowed";
    else if (response.contains("1")) return "Access denied";
  }

  static registration(response) {
    //registrationUser
    if (response.contains("0")) return "";
    else if (response.contains("1")) return "";
    else if (response.contains("2")) return "";
    else if (response.contains("3")) return "";
    else if (response.contains("4")) return "";
    else return "";
  }

  static sendCodeToEmail(response) {
    //forgotPasswordCode
    if (response.contains("0")) return "";
    else if (response.contains("1")) return "";
    else if (response.contains("3")) return "";
    else return "";
  }

  static afterRestorePaswword(response) {
    //afterRestorePassword
    if (response.contains("0")) return "";
    else if (response.contains("1")) return "";
    else if (response.contains("2")) return "";
    else if (response.contains("3")) return "";
    else if (response.contains("4")) return "";
    else if (response.contains("5")) return "";
    else return "";
  }
}
