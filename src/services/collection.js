import ApiHelper from "./api";

export default class CollectionService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all divisions
  getCollections = async (signal) => {
    return await this.apiHelper.get({ signal: signal, reqUrl: "collection" });
  };
  //serach all divisions
  searchCollections = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "collection/search",
      reqBody: reqBody,
    });
  };
  //Create a new Division
  createCollection = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "collection/",
      reqBody: reqBody,
    });
  };
  //Update a Division
  updateCollection = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "collection/id/" + param._id,
      reqBody: reqBody,
    });
  };
}
