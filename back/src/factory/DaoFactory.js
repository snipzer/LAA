const BaseFactory = require('./BaseFactory');
const ApolloClientMaker = require('../config/ApolloClientMaker');
const { gql } = require('apollo-boost');
const UserDao = require('../dao/UserDao');
const RepositoryDao = require('../dao/RepositoryDao');
const GithubDao = require('../dao/GithubDao');

/**
 * Here we instanciate the daos
 */
class DaoFactory extends BaseFactory {
    static initDaos(daos, models, logger) {
        return new Promise((resolve, reject) => {
            try {
                daos.user = new UserDao(logger, models.user);
                daos.repository = new RepositoryDao(logger, models.repository);
                ApolloClientMaker.getClient(logger).then((apolloClient) => {
                    daos.github = new GithubDao(logger, apolloClient, gql);
                    resolve();
                }).catch(err => reject(err));
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = DaoFactory;
