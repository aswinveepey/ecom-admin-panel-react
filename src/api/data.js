import ApiHelper from "./api";

export default class DataApi {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all customers
  getCustomerData = async (signal) => {
    return await this.apiHelper.get(signal, "data/customer");
  };
  getCurrentGmv = async (signal) => {
    return await this.apiHelper.get(signal, "data/currentGmv");
  };
  getQuarterGmv = async (signal) => {
    return await this.apiHelper.get(signal, "data/quarterGmv");
  };
  getMonthlyGmv = async (signal) => {
    return await this.apiHelper.get(signal, "data/monthlyGmv");
  };
}
