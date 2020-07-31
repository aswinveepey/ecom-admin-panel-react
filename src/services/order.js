import ApiHelper from "./api";

export default class OrderService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all orders
  getOrders = async (signal, orderFilterStartDate, orderFilterEndDate) => {
    return await this.apiHelper.get(
      signal,
      `order?startDate=${orderFilterStartDate}&endDate=${orderFilterEndDate}`
    );
  };
  //serach all orders
  searchOrders = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post(signal, "order/search", reqBody);
  };
  //Create a new Order
  createOrder = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "order/", reqBody);
  };
  //Update a Order
  updateOrder = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(
      signal,
      "order/id/" + param._id,
      reqBody
    );
  };
}
