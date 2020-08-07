import { BASE_URL, TENANT_ID } from "../constants";
import Cookies from "js-cookie";
import store from "../store"

export default function ApiHelper(){

  const headers = {
                      "Content-Type": "application/json",
                      Authorization: Cookies.get("token"),
                    }
  const get = async ({signal, reqUrl, reqParams=""})=>{
    const requestOptions = {
      method: "GET",
      headers: headers,
    };
    const fetchurl =
      BASE_URL + reqUrl + "?tenantId=" + TENANT_ID + "&" + reqParams;
    const response = await fetch(fetchurl, requestOptions, { signal: signal });
    const { status } = response;
    const responseData = await response.json();
    if (status === 200) {
      return responseData.data;
    }
    const payload =
      typeof responseData.error === "string"
        ? responseData.error
        : "Unknown Error Occurred";
    store.dispatch({
      type: "APIERROR",
      payLoad: payload,
    });
    if (responseData.error) {
      throw new Error(responseData.error);
    }
  }
  const post = async ({signal, reqUrl, reqParams="", reqBody={}}) => {
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: reqBody,
    };
    const fetchurl = BASE_URL + reqUrl + "?tenantId=" + TENANT_ID + "&" +reqParams;
    const response = await fetch(fetchurl, requestOptions, { signal: signal });
    const { status } = response;
    const responseData = await response.json();
    if (status === 200) {
      responseData.message &&
        store.dispatch({
          type: "APISUCCESS",
          payLoad: responseData.message,
        });
      return responseData.data;
    }
    const payload =
      typeof responseData.error === "string"
        ? responseData.error
        : "Unknown Error Occurred";
    store.dispatch({
      type: "APIERROR",
      payLoad: payload,
    });
    if (responseData.error) {
      throw new Error(responseData.error);
    }
  };
  return{get,post}
}