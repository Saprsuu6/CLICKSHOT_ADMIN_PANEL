import { yearMonthDay } from "../utils/DateFormats";
import { locale } from "../utils/Localisation";
import { BASE_URL } from "./BaseUrl";

export default class Authorization {
  static async logIn(login, password) {
    const responce = await fetch(`${BASE_URL} + /authorize`, {
      method: "POST",
      body: {
        login: login,
        password: password,
      },
    }).then(async (responce) => {
      return {
        data: await responce.json(),
      };
    });

    return responce;
  }

  static async singIn(login, password, email) {
    const responce = await fetch(`${BASE_URL} + /authorize`, {
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
    }).then(async (responce) => {
      return {
        data: await responce.json(),
      };
    });

    return responce;
  }
}
