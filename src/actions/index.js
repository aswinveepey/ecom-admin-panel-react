export const setAPISuccess = ()=>{
  return {
    type: "APISUCCESS",
  };
}
export const setAPIError = ()=>{
  return {
    type: "APIERROR",
  };
}
export const setApiCallInProgress = () => {
  return {
    type: "APIPROGRESS",
  };
};
export const unsetApiCallInProgress = () => {
  return {
    type: "APICALLEND",
  };
};
export const setOrderUpdate = ()=>{
  return {
    type: "ORDER_UPDATED",
  };
}
export const setUser = ()=>{
  return {
    type: "SETUSER",
  };
}
export const unSetUser = ()=>{
  return {
    type: "UNSETUSER",
  };
}