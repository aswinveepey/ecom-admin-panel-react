import ApiHelper from "./api";

export default class DivisionService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all divisions
  getDivisions = async (signal) => {
    return await this.apiHelper.get({signal:signal, reqUrl: "division"});
  };
  //serach all divisions
  searchDivisions = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post({signal:signal, reqUrl: "division/search", reqBody: reqBody});
  };
  //Create a new Division
  createDivision = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({signal:signal, reqUrl: "division/", reqBody: reqBody});
  };
  //Update a Division
  updateDivision = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(
    { signal:signal,
      reqUrl: "division/id/" + param._id,
      reqBody: reqBody}
    );
  };
}
