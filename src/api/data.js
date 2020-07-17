import ApiHelper from "./api";

export default class DataApi {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all customers
  getCustomerData = async (signal) => {
    return await this.apiHelper.get(signal, "data/customer");
  };
}
