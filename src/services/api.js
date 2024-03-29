import { BASE_URL, TENANT_ID } from "../constants";
import Cookies from "js-cookie";
import store from "../store";

export default function ApiHelper() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: Cookies.get("token"),
  };

  //get requests
  const get = async ({ signal, reqUrl, reqParams = "" }) => {
    const requestOptions = {
      method: "GET",
      headers: headers,
    };
    const fetchurl =
      BASE_URL + reqUrl + "?tenantId=" + TENANT_ID + "&" + reqParams;

    store.dispatch({
      type: "APILOADING",
    });

    const response = await fetch(fetchurl, requestOptions, { signal: signal });

    store.dispatch({
      type: "APICALLEND",
    });

    const { status } = response;
    const responseData = await response.json();

    if (status === 200) {
      return responseData.data;
    }

    if (responseData.error) {
      store.dispatch({
        type: "APIERROR",
        payLoad:
          typeof responseData.error === "string"
            ? responseData.error
            : "Unknown Error Occurred",
      });
      throw new Error(responseData.error);
    }
  };

  //post requests
  const post = async ({ signal, reqUrl, reqParams = "", reqBody = {} }) => {
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: reqBody,
    };
    const fetchurl =
      BASE_URL + reqUrl + "?tenantId=" + TENANT_ID + "&" + reqParams;

    store.dispatch({
      type: "APILOADING",
    });

    const response = await fetch(fetchurl, requestOptions, {
      signal: signal,
    });

    store.dispatch({
      type: "APICALLEND",
    });

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

    if (responseData.error) {
      store.dispatch({
        type: "APIERROR",
        payLoad:
          typeof responseData.error === "string"
            ? responseData.error
            : "Unknown Error Occurred",
      });
      throw new Error(responseData.error);
    }
    // if (responseData.errors) {
    //   responseData.errors.map((error) =>
    //     store.dispatch({
    //       type: "APIERROR",
    //       payLoad: error.msg,
    //     })
    //   );
    // }
  };
  return { get, post };
}
