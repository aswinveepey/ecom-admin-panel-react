import ApiHelper from "./helper";

export default class UserApi {
  constructor() {
    this.apiHelper = new ApiHelper();
  }
  //get all users
  getUsers = async (signal) => {
    return await this.apiHelper.get(signal, "user");
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
