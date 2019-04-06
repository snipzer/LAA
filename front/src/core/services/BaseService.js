export default class BaseService {
  constructor(http, baseUrl) {
    this._http = http;
    this._baseUrl = baseUrl;
  }
}
