const BaseService = require('./BaseService');

class GithubService extends BaseService {
    constructor(daos, logger) {
        super(logger);
        this.dao = daos.github;
    }
}

module.exports = GithubService;
