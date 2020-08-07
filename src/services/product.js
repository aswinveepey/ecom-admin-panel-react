import ApiHelper from "./api";

export default class ProductService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all products
  getProducts = async (signal) => {
    return await this.apiHelper.get({signal: signal, reqUrl: "product"});
  };
  //serach all products
  searchProducts = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "product/search",
      reqBody: reqBody,
    });
  };
  //Create a new Product
  createProduct = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "product/",
      reqBody: reqBody,
    });
  };
  //Update a Product
  updateProduct = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "product/id/" + param._id,
      reqBody: reqBody,
    });
  };
}