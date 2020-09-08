import ApiHelper from "./api";

export default class UserService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all users
  getUsers = async (signal) => {
    return await this.apiHelper.get({ signal: signal, reqUrl: "user" });
  };
  //get nav
  getNav = async (signal) => {
    return await this.apiHelper.get({ signal: signal, reqUrl: "user/nav" });
  };
  //get one users
  getOneUser = async (signal, userId) => {
    return await this.apiHelper.get({
      signal: signal,
      reqUrl: "user/id/" + userId,
    });
  };
  //get self details
  getSelf = async (signal) => {
    return await this.apiHelper.get({ signal: signal, reqUrl: "user/self" });
  };
  //serach all users
  searchUsers = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "user/search",
      reqBody: reqBody,
    });
  };
  //Create a new User
  createUser = async ({signal, param}) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "user/",
      reqBody: reqBody,
    });
  };
  //Update a User
  updateUser = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "user/id/" + param._id,
      reqBody: reqBody,
    });
  };
}
