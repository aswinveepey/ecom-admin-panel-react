const apiFeedbackReducer = (state, action)=>{
  console.log(action.type)
  switch (action.type) {
    case "APISUCCESS":
      return {
        ...state,
        apisuccess: action.payLoad,
      };
    case "APIERROR":
      return {
        ...state,
        apierror: action.payLoad,
      };
    default:
      return {
        ...state,
      };
  }
}

export default apiFeedbackReducer;