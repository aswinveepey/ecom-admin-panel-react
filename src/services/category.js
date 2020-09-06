import ApiHelper from "./api";

export default class CategoryService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all Categories
  getCategories = async (signal) => {
    return await this.apiHelper.get({ signal: signal, reqUrl: "category" });
  };
  //get one category
  getOneSku = async ({signal, categoryId}) => {
    return await this.apiHelper.get({
      signal: signal,
      reqUrl: "category/id/" + categoryId,
    });
  };
  //serach all Categories
  searchCategories = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "category/search",
      reqBody: reqBody,
    });
  };
  //Create a new Category
  createCategory = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "category/",
      reqBody: reqBody,
    });
  };
  //Update a Category
  updateCategory = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "category/id/" + param._id,
      reqBody: reqBody,
    });
  };
}
