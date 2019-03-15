class GithubDao {
    constructor(logger, apolloClient, gql) {
        this.logger = logger;
        this.client = apolloClient;
        this.gql = gql;
        this.logger.info(`Instanciating ${this.constructor.name}...`);
    }

    testQuery() {
        return this.client.query({
            query: this.gql`
            {
                viewer:user(login:"Jlandure")  {
                    login
                    name
                    location
                    company
                    commitComments{
                        totalCount
                    }
                }
            }`
        });
    }
}

module.exports = GithubDao;
