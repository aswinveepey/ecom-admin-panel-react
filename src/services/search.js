import ApiHelper from "./api";

export default class SearchService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  
  //serach
  search = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });

    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "search",
      reqBody: reqBody,
    });
  };
}
