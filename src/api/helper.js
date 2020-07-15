import { BASE_URL } from "../constants";
import Cookies from "js-cookie";

export default class ApiHelper{
  constructor(){
    this.headers = {
      "Content-Type": "application/json",
      Authorization: Cookies.get("token"),
    };
  }

  get = async (signal, reqUrl)=>{
    const requestOptions = {
      method: "GET",
      headers: this.headers,
    };
    const fetchurl = BASE_URL + reqUrl;
    const response = await fetch(fetchurl, requestOptions, { signal: signal });
    const { status } = response;
    const responseData = await response.json();
    if (status === 200) {
      return responseData.data;
    }
    if (responseData.message) throw new Error(responseData.message);
  }
  post = async (signal, reqUrl, reqBody)=>{
    const requestOptions = {
      method: "POST",
      headers: this.headers,
      body: reqBody,
    };
    const fetchurl = BASE_URL + reqUrl;
    const response = await fetch(fetchurl, requestOptions, { signal: signal });
    const { status } = response;
    const responseData = await response.json();
    if (status === 200) {
      return responseData.data;
    }
    if(responseData.message) throw new Error(responseData.message)
  }
}