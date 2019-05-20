import BaseService from './BaseService'

export default class GithubService extends BaseService {
    constructor(http, baseUrl) {
        super(http, baseUrl);
        this._complementUrl = '/api/github';
    }

    refreshRepositories (token, userId) {
      return this._http.get(`${this._baseUrl}${this._complementUrl}/refresh/repositories/${userId}`, {
          headers: {
              Authorization: token
          }
      });
    }
}
