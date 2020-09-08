import ApiHelper from "./api";

export default class BrandService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all brands
  getBrands = async (signal) => {
    return await this.apiHelper.get({signal:signal, reqUrl:"brand"});
  };
  //serach all brands
  searchBrands = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "brand/search",
      reqBody: reqBody,
    });
  };
  //Create a new Brand
  createBrand = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "brand/",
      reqBody: reqBody,
    });
  };
  //Update a Brand
  updateBrand = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "brand/id/" + param._id,
      reqBody: reqBody,
    });
  };
}
