import ApiHelper from "./api";

export default class CategoryService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all Categories
  getCategories = async (signal) => {
    return await this.apiHelper.get(signal, "category");
  };
  //serach all Categories
  searchCategories = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post(signal, "category/search", reqBody);
  };
  //Create a new Category
  createCategory = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(signal, "category/", reqBody);
  };
  //Update a Category
  updateCategory = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post(
      signal,
      "category/id/" + param._id,
      reqBody
    );
  };
}
