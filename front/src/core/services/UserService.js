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

    logout(token) {
        return this._http.get(`${this._baseUrl}/logout`, {
            headers: {
                Authorization: token
            }
        })
    }

    updateBody(token, user) {
        return this._http.post(`${this._baseUrl}${this._complementUrl}/update`, {
            id: user.id,
            email: user.email,
            github_login: user.github_login,
            github_organization: user.github_organization,
            github_token: user.github_token
        }, {
            headers: {
                Authorization: token
            }
        })
    }

    updatePassword(token, userId, oldPassword, password, passwordConfirm) {
        return this._http.post(`${this._baseUrl}${this._complementUrl}/updatePassword`, {
            id: userId,
            oldPassword: oldPassword,
            password: password,
            passwordConfirm: passwordConfirm
        }, {
            headers: {
                Authorization: token
            }
        })
    }

    getUser(token, userId) {
        return this._http.get(`${this._baseUrl}${this._complementUrl}/`+userId, {
            headers: {
                Authorization: token
            }
        });
    }

    checkUserToken(token) {
        return this._http.get(`${this._baseUrl}/checkSession`, {
            headers: {
                Authorization: token
            }
        })
    }
}
