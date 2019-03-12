const BaseFactory = require('./BaseFactory');
const UserService = require('../service/UserService');
const GithubService = require('../service/GithubService');

/**
 * Here we instantiate the services
 */
class ServiceFactory extends BaseFactory {
    static initServices(services, daos, logger) {
        return new Promise((resolve, reject) => {
            try {
                services.github = new GithubService(daos, logger);
                services.user = new UserService(daos, services, logger);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = ServiceFactory;
