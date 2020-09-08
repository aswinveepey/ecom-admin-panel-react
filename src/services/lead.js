import ApiHelper from "./api";

export default class LeadService {
  constructor() {
    this.apiHelper = ApiHelper();
  }
  //get all customers
  getLeads = async (signal) => {
    return await this.apiHelper.get({ signal: signal, reqUrl: "lead" });
  };

  //get one lead
  getOneLead = async (signal, leadId) => {
    return await this.apiHelper.get({
      signal: signal,
      reqUrl: "lead/id/" + leadId,
    });
  };
  //serach all leads
  searchLeads = async (signal, param) => {
    const reqBody = JSON.stringify({ searchString: param });
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "lead/search",
      reqBody: reqBody,
    });
  };
  //Create a new Lead
  createLead = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "lead/",
      reqBody: reqBody,
    });
  };
  //Update a Lead
  updateLead = async (signal, param) => {
    const reqBody = JSON.stringify(param);
    return await this.apiHelper.post({
      signal: signal,
      reqUrl: "lead/id/" + param._id,
      reqBody: reqBody,
    });
  };
}
