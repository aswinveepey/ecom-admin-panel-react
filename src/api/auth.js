import ApiHelper from "./helper";

export default class AuthApi {
  constructor() {
    this.apiHelper = new ApiHelper();
  }
  //Create a new Account
  authenticate = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "auth/authenticate", reqBody);
  };
}