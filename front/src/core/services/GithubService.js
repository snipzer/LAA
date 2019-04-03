import BaseService from './BaseService'

export default class GithubService extends BaseService {
    getRepositories () {
      return this._http.get(`${this._baseUrl}/api/github/repositories`);
    }
}
