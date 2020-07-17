import { BASE_URL } from "../constants";
import Cookies from "js-cookie";
import store from "../store"

export default function ApiHelper(){

  const headers = {
                      "Content-Type": "application/json",
                      Authorization: Cookies.get("token"),
                    }
  const get = async (signal, reqUrl)=>{
    const requestOptions = {
      method: "GET",
      headers: headers,
    };
    const fetchurl = BASE_URL + reqUrl;
    const response = await fetch(fetchurl, requestOptions, { signal: signal });
    const { status } = response;
    const responseData = await response.json();
    if (status === 200) {
      return responseData.data;
    }
    store.dispatch({
      type: "APIERROR",
      payLoad: responseData.message,
    });
  }
  const post = async (signal, reqUrl, reqBody)=>{
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: reqBody,
    };
    const fetchurl = BASE_URL + reqUrl;
    const response = await fetch(fetchurl, requestOptions, { signal: signal });
    const { status } = response;
    const responseData = await response.json();
    if (status === 200) {
      store.dispatch({
        type: "APISUCCESS",
        payLoad: "Successful Execution",
      });
      return responseData.data;
    }
    store.dispatch({
      type: "APIERROR",
      payLoad: responseData.message,
    });
  }
  return{get,post}
}