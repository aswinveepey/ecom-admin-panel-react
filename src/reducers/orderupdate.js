const orderUpdateReducer = (state=false, action) => {
  if (action.type === "ORDER_UPDATED"){
    return {
      orderupdated:true
    }
  } 
  return state;
};

export default orderUpdateReducer;
