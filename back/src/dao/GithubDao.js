class GithubDao {
    constructor(logger, apolloClient, gql) {
        this.logger = logger;
        this.client = apolloClient;
        this.gql = gql;
        this.logger.info(`Instanciating ${this.constructor.name}...`);
    }

    getUserInformation() {
        return this.client.query({
            query: this.gql`
            {
                user(login: "SnipzEr")  {
                    id
                    login
                    name
                    company
                }
            }`
        });
    }

    getRateLimit() {
        return this.client.query({
            query: this.gql`
            {
                rateLimit {
                    limit
                    cost
                    resetAt
                    remaining
                    nodeCount
                }
            }`
        });
    }

    getOrganizationUsers(githubOrganization) {
        return this.client.query({
            query: this.gql`
{
  viewer: organization(login: "${githubOrganization}") {
    login
    name
    location
    membersWithRole(first: 20) {
      pageInfo {
      startCursor   
      }
      edges {
        node {
          login
          repositories(first: 5, privacy: PUBLIC, orderBy: {field: STARGAZERS, direction: DESC}, isFork: false) {
            edges {
              node {
                owner {
                  login
                }
                name
                url
                stargazers {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
}`
        });
    }
}

module.exports = GithubDao;
