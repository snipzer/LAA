import BaseService from './BaseService'

export default class RepositoryService extends BaseService {
    constructor(http, baseUrl) {
        super(http, baseUrl);
        this._complementUrl = '/api/repository';
    }

    getRepository(token, userId) {
      return this._http.get(`${this._baseUrl}${this._complementUrl}/${userId}`, {
          headers: {
              Authorization: token
          }
      });
    }
}
