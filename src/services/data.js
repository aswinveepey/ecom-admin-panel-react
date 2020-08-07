import ApiHelper from "./api";

export default class DataService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all customers
  getCustomerData = async (signal) => {
    return await this.apiHelper.get({signal:signal, reqUrl:"data/customer"});
  };
  getTodayGmv = async (signal) => {
    return await this.apiHelper.get({signal:signal, reqUrl:"data/gmvData", reqParams:"filterBy=today"});
  };
  getMonthGmv = async (signal) => {
    return await this.apiHelper.get({signal:signal, reqUrl:"data/gmvData", reqParams:"filterBy=month"});
  };
  getQuarterGmv = async (signal) => {
    return await this.apiHelper.get({signal:signal, reqUrl:"data/gmvData", reqParams:"filterBy=quarter"});
  };
  getGmvTimeSeries = async (signal) => {
    return await this.apiHelper.get({signal:signal, reqUrl:"data/gmvTimeSeries"});
  };
  getOrderItemDump = async (signal) => {
    return await this.apiHelper.get({signal:signal, reqUrl:"data/getOrderItemDump"});
  };
  getCustomerDump = async (signal) => {
    return await this.apiHelper.get({signal:signal, reqUrl:"data/customerDataDump"});
  };
}
