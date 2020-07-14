import { BASE_URL } from "../constants";
import Cookies from "js-cookie";

export default class CustomerApi {
  constructor(){
    this.headers = {
      "Content-Type": "application/json",
      Authorization: Cookies.get("token"),
    };
  }
  //get all customers
  getCustomers= async ()=>{
    const abortController = new AbortController();
    const signal = abortController.signal;
    const requestOptions = {
      method: "GET",
      headers: this.headers,
    };
    const fetchurl = BASE_URL + "customer";
    const response =  await fetch(fetchurl, requestOptions, { signal: signal })
    const { status } = response;
    const responseData = await response.json()
    if (status===200){
      return responseData.data || ""
    }
    abortController.abort();
  }
  //serach all customers
  searchCustomers= async (param)=>{
    const abortController = new AbortController();
    const signal = abortController.signal;
    const requestOptions = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ searchString: param }),
    };
    const fetchurl = BASE_URL + "customer/search";
    const response =  await fetch(fetchurl, requestOptions, { signal: signal })
    const { status } = response;
    const responseData = await response.json()
    if (status===200){
      return responseData.data ||""
    }
    abortController.abort();
  }
  //Create a new Customer
  createCustomer= async (param)=>{
    const abortController = new AbortController();
    const signal = abortController.signal;
    const requestOptions = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(param),
    };
    const fetchurl = BASE_URL + "customer/";
    const response =  await fetch(fetchurl, requestOptions, { signal: signal })
    const { status } = response;
    const responseData = await response.json()
    if (status===200){
      return responseData.data || ""
    }
    abortController.abort();
  }
  //Update a Customer
  updateCustomer= async (param)=>{
    const abortController = new AbortController();
    const signal = abortController.signal;
    const requestOptions = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(param),
    };
    const fetchurl = BASE_URL + "customer/id/" + param._id;
    const response =  await fetch(fetchurl, requestOptions, { signal: signal })
    const { status } = response;
    const responseData = await response.json()
    if (status===200){
      return responseData.data || ""
    }
    abortController.abort();
  }
}