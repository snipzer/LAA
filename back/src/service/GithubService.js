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

    getOrganizationUsers() {
        return new Promise((resolve, reject) => {
            this.dao.getOrganizationUsers()
                .then((response) => {
                    console.log(response)
                    console.log(response.data.viewer.membersWithRole)
                    resolve(response);
                }).catch(err => reject(err));
        });
    }
}

module.exports = GithubService;
