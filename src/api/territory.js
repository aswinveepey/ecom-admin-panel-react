import ApiHelper from "./api";

export default class TerritoryApi {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all territories
  getTerritories = async (signal) => {
    return await this.apiHelper.get(signal, "territory");
  };
  //serach all territories
  searchTerritories = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post(signal, "territory/search", reqBody);
  };
  //Create a new Territory
  createTerritory = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "territory/", reqBody);
  };
  //Update a Territory
  updateTerritory = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(
      signal,
      "territory/id/" + param._id,
      reqBody
    );
  };
}
