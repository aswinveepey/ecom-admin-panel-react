import ApiHelper from "./api";

export default class TerritoryService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all territories
  getTerritories = async (signal) => {
    return await this.apiHelper.get({ signal, reqUrl: "territory" });
  };
  //serach all territories
  searchTerritories = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "territory/search",
      reqBody: reqBody,
    });
  };
  //Create a new Territory
  createTerritory = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "territory/",
      reqBody: reqBody,
    });
  };
  //Update a Territory
  updateTerritory = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "territory/id/" + param._id,
      reqBody: reqBody,
    });
  };
}
