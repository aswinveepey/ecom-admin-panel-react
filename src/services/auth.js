import ApiHelper from "./api";

export default class AuthService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //Create a new Account
  authenticate = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "auth/authenticate",
      reqBody: reqBody,
    });
  };
}
