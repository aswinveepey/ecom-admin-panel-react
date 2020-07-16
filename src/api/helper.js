import { BASE_URL } from "../constants";
import Cookies from "js-cookie";
import React from "react";
import useAPIFeedback from "../hooks/useapifeedback";
import { useContext } from "react";
import { APIFeedbackContext } from "../providers/apifeedbackprovider";

export default function ApiHelper(){
  // constructor(){
  //   super()
  //   this.headers = {
  //     "Content-Type": "application/json",
  //     Authorization: Cookies.get("token"),
  //   };
  //   this.context = useContext(APIFeedbackContext);
  // }
  const headers = {
                      "Content-Type": "application/json",
                      Authorization: Cookies.get("token"),
                    }
  // const { setError } = useContext(APIFeedbackContext);
  const get = async (signal, reqUrl)=>{
    const requestOptions = {
      method: "GET",
      headers: headers,
    };
    const fetchurl = BASE_URL + reqUrl;
    const response = await fetch(fetchurl, requestOptions, { signal: signal });
    const { status } = response;
    const responseData = await response.json();
    // setError({message:"Custom Error"});
    if (status === 200) {
      return responseData.data;
    }
    throw new Error(responseData.message);
    // setError(responseData.message);
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
      return responseData.data;
    }
    throw new Error(responseData.message);
  }
  return{get,post}
}