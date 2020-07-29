import ApiHelper from "./api";

export default class AccountService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all accounts
  getAccounts = async (signal) => {
    return await this.apiHelper.get(signal, "account");
  };
  //serach all accounts
  searchAccounts = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post(signal, "account/search", reqBody);
  };
  //Create a new Account
  createAccount = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "account/", reqBody);
  };
  //Update a Account
  updateAccount = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(
      signal,
      "account/id/" + param._id,
      reqBody
    );
  };
}
