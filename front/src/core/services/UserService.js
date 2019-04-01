import BaseService from './BaseService'

export default class UserService extends BaseService {
    login (email, password) {
      return this._http.post('http://localhost:3000/login', {
          email: email,
          password: password
      })
    }

  register (email, password, githubLogin, githubOrganization, githubToken) {
    return this._http.post("http://localhost:3000/api/user", {
        email: email,
        password: password,
        github_login: githubLogin,
        github_organization: githubOrganization,
        github_token: githubToken
    });
  }
}
