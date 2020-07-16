import ApiHelper from "./helper";

export default class DivisionApi {
  constructor() {
    this.apiHelper = new ApiHelper();
  }
  //get all divisions
  getDivisions = async (signal) => {
    return await this.apiHelper.get(signal, "division");
  };
  //serach all divisions
  searchDivisions = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post(signal, "division/search", reqBody);
  };
  //Create a new Division
  createDivision = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "division/", reqBody);
  };
  //Update a Division
  updateDivision = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(
      signal,
      "division/id/" + param._id,
      reqBody
    );
  };
}
