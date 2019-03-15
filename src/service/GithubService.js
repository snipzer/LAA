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

    testQuery() {
        return new Promise((resolve, reject) => {
            this.dao.testQuery()
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
}

module.exports = GithubService;
