import ApiHelper from "./helper";

export default class BrandApi {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all brands
  getBrands = async (signal) => {
    return await this.apiHelper.get(signal, "brand");
  };
  //serach all brands
  searchBrands = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post(signal, "brand/search", reqBody);
  };
  //Create a new Brand
  createBrand = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "brand/", reqBody);
  };
  //Update a Brand
  updateBrand = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(
      signal,
      "brand/id/" + param._id,
      reqBody
    );
  };
}
