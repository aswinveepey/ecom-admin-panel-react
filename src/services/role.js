import ApiHelper from "./api";

export default class RoleService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all roles
  getRoles = async (signal) => {
    return await this.apiHelper.get({ signal: signal, reqUrl: "role" });
  };
  //serach all roles
  searchRoles = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "role/search",
      reqBody: reqBody,
    });
  };
  //Create a new Role
  createRole = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "role/",
      reqBody: reqBody,
    });
  };
  //Update a Role
  updateRole = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "role/id/" + param._id,
      reqBody: reqBody,
    });
  };
}
