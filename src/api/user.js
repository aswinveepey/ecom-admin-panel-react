import ApiHelper from "./api";

export default class UserApi {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all users
  getUsers = async (signal) => {
    return await this.apiHelper.get(signal, "user");
  };
  //get one users
  getOneUser = async (signal, userId) => {
    return await this.apiHelper.get(signal, "user/id/"+userId);
  };
  //get self details
  getSelf= async (signal) => {
    return await this.apiHelper.get(signal, "user/self");
  };
  //serach all users
  searchUsers = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post(signal, "user/search", reqBody);
  };
  //Create a new User
  createUser = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "user/", reqBody);
  };
  //Update a User
  updateUser = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(
      signal,
      "user/id/" + param._id,
      reqBody
    );
  };
}
