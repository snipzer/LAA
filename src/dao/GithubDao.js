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

    getOrganizationUsers() {
        return this.client.query({
            query: this.gql`
{
  viewer: organization(login: "Zenika") {
    login
    name
    location
    membersWithRole(first: 100) {
      edges {
        node {
          login
          repositories(first: 40, privacy: PUBLIC, orderBy: {field: STARGAZERS, direction: DESC}, isFork: false) {
            edges {
              node {
                owner {
                  login
                }
                name
                primaryLanguage {
                  name
                }
                stargazers {
                  totalCount
                }
                pullRequests(first: 50) {
                  edges {
                    node {
                      author {
                        login
                      }
                    }
                  }
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
