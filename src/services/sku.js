import ApiHelper from "./api";

export default class SkuService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all skus
  getSkus = async (signal) => {
    return await this.apiHelper.get({ signal: signal, reqUrl: "sku" });
  };
  //get one sku
  getOneSku = async (signal, skuId) => {
    return await this.apiHelper.get({
      signal: signal,
      reqUrl: "sku/id/web/" + skuId,
    });
  };
  //serach all skus
  searchSkus = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "sku/search",
      reqBody: reqBody,
    });
  };
  //Create a new Sku
  createSku = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "sku/",
      reqBody: reqBody,
    });
  };
  //Update a Sku
  updateSku = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "sku/id/" + param._id,
      reqBody: reqBody,
    });
  };
}
