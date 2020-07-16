import ApiHelper from "./helper"

export default class CustomerApi {
  constructor(){
    this.apiHelper = new ApiHelper()
  }
  //get all customers
  getCustomers= async (signal)=>{
    return await this.apiHelper.get(signal, "customer")
  }

  //get one customer
  getOneCustomer= async (signal, customerId)=>{
    return await this.apiHelper.get(signal, "customer/id/"+customerId)
  }
  //serach all customers
  searchCustomers= async (signal, param)=>{
    const reqBody = JSON.stringify({ searchString:  param});
    return await this.apiHelper.post(signal, "customer/search", reqBody);
  }
  //Create a new Customer
  createCustomer= async (signal, param)=>{
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "customer/", reqBody);
  }
  //Update a Customer
  updateCustomer= async (signal, param)=>{
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "customer/id/"+param._id, reqBody);
  }
}