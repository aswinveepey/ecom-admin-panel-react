import ApiHelper from "./api";

export default class AssetService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all accounts
  getAssetPutUrl = async ({signal, reqBody}) => {
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "asset/generatePutUrl",
      reqBody: reqBody,
    });
  };
}
