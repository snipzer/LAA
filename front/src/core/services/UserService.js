import BaseService from './BaseService'

export default class UserService extends BaseService {
    constructor(http, baseUrl) {
        super(http, baseUrl);
        this._complementUrl = '/api/user';
    }

    login (email, password) {
      return this._http.post(`${this._baseUrl}/login`, {
          email: email,
          password: password
      })
    }

    register (email, password, githubLogin, githubOrganization, githubToken) {
        return this._http.post(`${this._baseUrl}${this._complementUrl}`, {
            email: email,
            password: password,
            github_login: githubLogin,
            github_organization: githubOrganization,
            github_token: githubToken
        });
    }
}
