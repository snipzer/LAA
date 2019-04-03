import BaseService from './BaseService'

export default class GithubService extends BaseService {
    constructor(http, baseUrl) {
        super(http, baseUrl);
        this._complementUrl = '/api/github';
    }

    getRepositories (token) {
      return this._http.get(`${this._baseUrl}${this._complementUrl}/repositories`, {
          headers: {
              Authorization: token
          }
      });
    }
}
