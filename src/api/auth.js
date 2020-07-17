import ApiHelper from "./api";

export default class AuthApi {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //Create a new Account
  authenticate = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "auth/authenticate", reqBody);
  };
}
