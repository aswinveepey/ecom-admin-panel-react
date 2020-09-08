import ApiHelper from "./api";

export default class DataService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all customers
  getCustomerData = async (signal) => {
    return await this.apiHelper.get({
      signal: signal,
      reqUrl: "data/customer",
    });
  };
  getGmv = async ({signal, param}) => {
    return await this.apiHelper.get({
      signal: signal,
      reqUrl: "data/gmvData",
      reqParams: "filterBy="+param,
    });
  };
  getGmvTimeSeries = async ({signal, param}) => {
    return await this.apiHelper.get({
      signal: signal,
      reqUrl: "data/gmvTimeSeries",
      reqParams: "filterBy="+param,
    });
  };
  getOrderItemDump = async (signal) => {
    return await this.apiHelper.get({
      signal: signal,
      reqUrl: "data/getOrderItemDump",
    });
  };
  getCustomerDump = async (signal) => {
    return await this.apiHelper.get({
      signal: signal,
      reqUrl: "data/getCustomerDump",
    });
  };
  getInventoryDump = async (signal) => {
    return await this.apiHelper.get({
      signal: signal,
      reqUrl: "data/getInventoryDump",
    });
  };
  getSkuDump = async (signal) => {
    return await this.apiHelper.get({
      signal: signal,
      reqUrl: "data/getSkuDump",
    });
  };
  getProductDump = async (signal) => {
    return await this.apiHelper.get({
      signal: signal,
      reqUrl: "data/getProductDump",
    });
  };
  bulkUploadInventory = async ({signal, param}) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "data/bulkUploadInventory",
      reqBody: reqBody,
    });
  };
  bulkUploadSku = async ({signal, param}) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "data/bulkUploadSku",
      reqBody: reqBody,
    });
  };
  bulkUploadProduct = async ({signal, param}) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "data/bulkUploadProduct",
      reqBody: reqBody,
    });
  };
  bulkUploadOrderItem = async ({signal, param}) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "data/bulkUploadOrderItem",
      reqBody: reqBody,
    });
  };
}
