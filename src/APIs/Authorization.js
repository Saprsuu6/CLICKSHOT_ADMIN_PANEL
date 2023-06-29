import { BASE_URL } from "./BaseUrl";

export default class Authorization {
  static async singIn(login, password) {
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
}
