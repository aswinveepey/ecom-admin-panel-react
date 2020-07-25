const userStateReducer = (state, action) => {
  switch (action.type) {
    case "SETUSER":
      return {
        ...state,
        user: action.payLoad,
      };
    case "UNSETUSER":
      return {
        ...state,
        user: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userStateReducer;
