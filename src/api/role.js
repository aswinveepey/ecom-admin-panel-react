import ApiHelper from "./helper";

export default class RoleApi {
  constructor() {
    this.apiHelper = new ApiHelper();
  }
  //get all roles
  getRoles = async (signal) => {
    return await this.apiHelper.get(signal, "role");
  };
  //serach all roles
  searchRoles = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post(signal, "role/search", reqBody);
  };
  //Create a new Role
  createRole = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "role/", reqBody);
  };
  //Update a Role
  updateRole = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(
      signal,
      "role/id/" + param._id,
      reqBody
    );
  };
}
