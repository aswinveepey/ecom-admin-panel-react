import ApiHelper from "./helper";

export default class ProductApi {
  constructor() {
    this.apiHelper = new ApiHelper();
  }
  //get all products
  getProducts = async (signal) => {
    return await this.apiHelper.get(signal, "product");
  };
  //serach all products
  searchProducts = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post(signal, "product/search", reqBody);
  };
  //Create a new Product
  createProduct = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "product/", reqBody);
  };
  //Update a Product
  updateProduct = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(
      signal,
      "product/id/" + param._id,
      reqBody
    );
  };
}