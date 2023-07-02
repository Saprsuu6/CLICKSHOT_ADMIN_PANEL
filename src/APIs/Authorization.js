import { yearMonthDay } from "../utils/DateFormats";
import { locale } from "../utils/Localisation";
import { BASE_URL } from "./BaseUrl";

export default class Authorization {
  static async logIn(login, password) {
    const response = await fetch(`${BASE_URL} + /authorize`, {
      method: "POST",
      body: {
        login: login,
        password: password,
      },
    }).then(async (response) => {
      return {
        data: await response.json(),
      };
    });

    return response;
  }

  static async singIn(login, password, email) {
    const response = await fetch(`${BASE_URL} + /authorize`, {
      method: "POST",
      body: {
        login: login,
        password: password,
        name: login,
        surname: "",
        email: email,
        avatar: "",
        birthday: new Date().toLocaleDateString(locale, yearMonthDay),
        bio: "",
      },
    }).then(async (response) => {
      return {
        data: await response.json(),
      };
    });

    return response;
  }

  static async sendCodeFToEmail(login, code) {
    const response = await fetch(
      `${BASE_URL} + /restore?login=${login}&code=${code}`,
      {
        method: "GET",
      }
    ).then(async (response) => {
      return {
        data: await response.json(),
      };
    });

    return response;
  }

  static async checkPressedEmailLink(login) {
    const response = await fetch(`${BASE_URL} + /confirm?login=${login}}`, {
      method: "GET",
    }).then(async (response) => {
      return {
        data: await response.json(),
      };
    });

    return response;
  }
}
