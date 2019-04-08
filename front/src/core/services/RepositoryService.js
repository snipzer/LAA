import BaseService from './BaseService'

export default class RepositoryService extends BaseService {
    constructor(http, baseUrl) {
        super(http, baseUrl);
        this._complementUrl = '/api/repository';
    }

    getRepository(token) {
      return this._http.get(`${this._baseUrl}${this._complementUrl}`, {
          headers: {
              Authorization: token
          }
      });
    }
}
