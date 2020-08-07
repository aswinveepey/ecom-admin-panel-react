import ApiHelper from "./api";

export default class OrderService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all orders
  getOrders = async (signal, orderFilterStartDate, orderFilterEndDate) => {
    return await this.apiHelper.get({
      signal: signal,
      reqUrl: "order",
      reqParams:`startDate=${orderFilterStartDate}&endDate=${orderFilterEndDate}`,
    });
  };
  //serach all orders
  searchOrders = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post({signal: signal, reqUrl: "order/search", reqBody: reqBody});
  };
  //Create a new Order
  createOrder = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({signal: signal, reqUrl: "order/", reqBody: reqBody});
  };
  //Update a Order
  updateOrder = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(
      {signal: signal,
      reqUrl: "order/id/" + param._id,
      reqBody: reqBody}
    );
  };
}
