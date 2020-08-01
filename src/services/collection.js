import ApiHelper from "./api";

export default class CollectionService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all divisions
  getCollections = async (signal) => {
    return await this.apiHelper.get(signal, "collection");
  };
  //serach all divisions
  searchCollections = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post(signal, "collection/search", reqBody);
  };
  //Create a new Division
  createCollection = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "collection/", reqBody);
  };
  //Update a Division
  updateCollection = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(
      signal,
      "collection/id/" + param._id,
      reqBody
    );
  };
}
