import ApiHelper from "./api";

export default class SkuApi {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all skus
  getSkus = async (signal) => {
    return await this.apiHelper.get(signal, "sku");
  };
  //get one sku
  getOneSku = async (signal, skuId) => {
    return await this.apiHelper.get(signal, "sku/id/"+skuId);
  };
  //serach all skus
  searchSkus = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post(signal, "sku/search", reqBody);
  };
  //Create a new Sku
  createSku = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "sku/", reqBody);
  };
  //Update a Sku
  updateSku = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(
      signal,
      "sku/id/" + param._id,
      reqBody
    );
  };
}
