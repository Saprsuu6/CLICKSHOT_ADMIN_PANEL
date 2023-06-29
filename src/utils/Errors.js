export default class Errors {
  static authorization(response) {
    if (response.contains("0")) return "Access allowed";
    else if (response.contains("1")) return "Access denied";
  }
}
