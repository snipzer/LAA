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
}

module.exports = GithubService;
