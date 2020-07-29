import ApiHelper from "./api";

export default class DataService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all customers
  getCustomerData = async (signal) => {
    return await this.apiHelper.get(signal, "data/customer");
  };
  getTodayGmv = async (signal) => {
    return await this.apiHelper.get(signal, "data/gmvData?filterBy=today");
  };
  getMonthGmv = async (signal) => {
    return await this.apiHelper.get(signal, "data/gmvData?filterBy=month");
  };
  getQuarterGmv = async (signal) => {
    return await this.apiHelper.get(signal, "data/gmvData?filterBy=quarter");
  };
  getGmvTimeSeries = async (signal) => {
    return await this.apiHelper.get(signal, "data/gmvTimeSeries");
  };
}
