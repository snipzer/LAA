const BaseService = require('./BaseService');
const ApolloClientMaker = require('../config/ApolloClientMaker');

class GithubService extends BaseService {
    constructor(daos, logger) {
        super(logger);
        this.dao = daos.github;
    }

    updateClientUrl(userToken) {
        this.dao.client.uri = ApolloClientMaker.getUriWithToken(userToken);
    }

    getUserInformation() {
        return new Promise((resolve, reject) => {
            this.dao.getUserInformation()
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }

    getRateLimit() {
        return new Promise((resolve, reject) => {
            this.dao.getRateLimit()
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }

    getOrgUsersRepositories(githubOrganization) {
        return new Promise((resolve, reject) => {
            this.dao.getOrganizationUsers(githubOrganization)
                .then((response) => {
                    const result = this._extractData(response);
                    result.sort((a, b) => {
                        return (a.stargazer < b.stargazer || a.users.length < b.users.length) ? 1 : -1;
                    });
                    resolve(result);
                }).catch(err => reject(err));
        });
    }

    _extractData(response) {
        const result = [];
        const members = response.data.viewer.membersWithRole.edges;
        for (let i = 0; i < members.length; i++) {
            let repositories = members[i].node.repositories.edges;
            let username = members[i].node.login;
            for (let j = 0; j < repositories.length; j++) {
                let reponame = repositories[j].node.name;
                let stargazer = repositories[j].node.stargazers.totalCount;
                let url = repositories[j].node.url;
                this._getRepositoriesInformation(result, reponame, username, stargazer, url);
            }
        }
        return result;
    }

    _getRepositoriesInformation(result, reponame, username, stargazer, url) {
        let isPresent = false;
        result.forEach(objet => {
            if (objet.reponame === reponame) {
                isPresent = true;
                if (!this._checkIfUserNamePresent(objet, username)) {
                    objet.users.push(username);
                }
            }
        });
        if (!isPresent) {
            result.push({
                reponame: reponame,
                url: url,
                stargazer: stargazer,
                users: [username]
            });
        }
    }

    _checkIfUserNamePresent(objet, username) {
        let isUserNamePresent = false;
        for (let y = 0; y < objet.users.length; y++) {
            if (objet.users[y] === username) {
                isUserNamePresent = true;
                break;
            }
        }
        return isUserNamePresent;
    }
}

module.exports = GithubService;
