import ApiHelper from "./api";

export default class CustomerService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all customers
  getCustomers = async (signal) => {
    return await this.apiHelper.get({ signal: signal, reqUrl: "customer" });
  };

  //get one customer
  getOneCustomer = async (signal, customerId) => {
    return await this.apiHelper.get({
      signal: signal,
      reqUrl: "customer/id/" + customerId,
    });
  };
  //serach all customers
  searchCustomers = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "customer/search",
      reqBody: reqBody,
    });
  };
  //Create a new Customer
  createCustomer = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "customer/",
      reqBody: reqBody,
    });
  };
  //Update a Customer
  updateCustomer = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "customer/id/" + param._id,
      reqBody: reqBody,
    });
  };
}
