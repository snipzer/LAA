const BaseFactory = require('./BaseFactory');
const ApolloClientMaker = require('../config/ApolloClientMaker');
const UserDao = require('../dao/UserDao');
const GithubDao = require('../dao/GithubDao');

/**
 * Here we instanciate the daos
 */
class DaoFactory extends BaseFactory {
    static initDaos(daos, models, logger) {
        return new Promise((resolve, reject) => {
            try {
                daos.user = new UserDao(logger, models.user);
                ApolloClientMaker.getClient(logger).then((apolloClient) => {
                    daos.github = new GithubDao(logger, apolloClient);
                    resolve();
                }).catch(err => reject(err));
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = DaoFactory;
