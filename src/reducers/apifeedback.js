const apiFeedbackReducer = (state, action)=>{
  switch (action.type) {
    case "APISUCCESS":
      return {
        ...state,
        apistate: {
          apisuccess: action.payLoad,
          apierror: null,
          apiloading: null,
        },
      };
    case "APIERROR":
      return {
        ...state,
        apistate: {
          apisuccess: null,
          apierror: action.payload,
          apiloading: null,
        },
      };
    case "APILOADING":
      return {
        ...state,
        apistate: {
          apisuccess: null,
          apierror: null,
          apiloading: true,
        },
      };
    case "APICALLEND":
      return {
        ...state,
        apistate: {
          apisuccess: null,
          apierror: null,
          apiloading: null,
        },
      };
    default:
      return {
        ...state,
        apistate: {
          apisuccess: null,
          apierror: null,
          apiloading: null,
        },
      };
  }
}

export default apiFeedbackReducer;