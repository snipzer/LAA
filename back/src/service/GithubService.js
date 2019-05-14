const BaseService = require('./BaseService');
const ApolloClientMaker = require('../config/ApolloClientMaker');
const MessageUtil = require('../util/MessageUtil');

class GithubService extends BaseService {
    constructor(daos, services, logger) {
        super(services, logger);
        this.dao = daos.github;
    }

    updateClientUrl(userToken) {
        this.dao.client.uri = ApolloClientMaker.getUriWithToken(userToken);
    }

    getUserInformation() {
        return new Promise((resolve, reject) => {
            this.dao.getUserInformation()
                .then(result => resolve(result))
                .catch(err => this.rejectAndLogError(reject, err.message));
        });
    }

    getRateLimit() {
        return new Promise((resolve, reject) => {
            this.dao.getRateLimit()
                .then(result => resolve(result))
                .catch(err => this.rejectAndLogError(reject, err.message));
        });
    }

    refreshRepository(session) {
        return new Promise((resolve, reject) => {
            this.dao.getOrganizationUsers(session.user.github_organization)
                .then((response) => {
                    let result = this._extractData(response);
                    // Bidoulle parce que je ne peux pas stocker d'array de string dans gcloud
                    result = result.map((element) => {
                        element.total_users = element.users.length;
                        element.users = element.users.join(' ');
                        return element;
                    });
                    this._saveData(result, session, resolve, reject);
                }).catch(async (err) => {
                    this.rejectAndLogError(reject, err.message);
                    if (err.message === MessageUtil.getErrors().GITHUB_BAD_GATEWAY.en) {
                        const result = await this.refreshRepository(session);
                        if (result === 'ok') resolve('ok');
                    }
                });
        });
    }

    _saveData(result, session, resolve, reject) {
        const now = new Date();
        const insertArray = [];
        result.forEach(async (element) => {
            element.createdOn = now;
            element.owner = session.user.id;
            try {
                insertArray.push(this.services.repository.dao.insert(element));
            } catch (err) {
                this.rejectAndLogError(reject, err.message);
            }
        });
        Promise.all(insertArray).then(() => {
            const lastDate = new Date(session.user.repository_current_date);
            session.user.repository_current_date = now;
            this.services.user.updateUser(session.user).then((datastoreEntity) => {
                session.user = datastoreEntity.data;
                session.user.id = datastoreEntity.key.id;
                this.services.repository.deleteAllByOwnerAndDate(session.user.id, lastDate)
                    .then(() => resolve('ok'))
                    .catch(err => this.rejectAndLogError(reject, err.message));
            }).catch(err => this.rejectAndLogError(reject, err.message));
        }).catch(err => this.rejectAndLogError(err.message));
    }

    _extractData(response) {
        const result = [];
        const members = response.data.viewer.membersWithRole.edges;
        for (let i = 0; i < members.length; i++) {
            const repositories = members[i].node.repositories.edges;
            const username = members[i].node.login;
            for (let j = 0; j < repositories.length; j++) {
                const reponame = repositories[j].node.name;
                const stargazer = repositories[j].node.stargazers.totalCount;
                const url = repositories[j].node.url;
                this._getRepositoriesInformation(result, reponame, username, stargazer, url);
            }
        }
        return result;
    }

    _getRepositoriesInformation(result, reponame, username, stargazer, url) {
        let isPresent = false;
        result.forEach((objet) => {
            if (objet.reponame === reponame) {
                isPresent = true;
                if (!this._checkIfUserNamePresent(objet, username)) {
                    objet.users.push(username);
                }
            }
        });
        if (!isPresent) {
            result.push({
                reponame,
                url,
                stargazer,
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
