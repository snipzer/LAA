class GithubDao {
    constructor(logger, apolloClient) {
        this.logger = logger;
        this.client = apolloClient;
        this.logger.info(`Instanciating ${this.constructor.name}...`);
    }
}

module.exports = GithubDao;
