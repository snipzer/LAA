/* eslint-disable no-unused-vars */
const BaseFactory = require('./BaseFactory');
const UserController = require('../controller/UserController');
const GithubController = require('../controller/GithubController');

/**
 * Here we instantiate the controllers
 */
class ControllerUtil extends BaseFactory {
    static initController(app, router, services, statusHandler, logger) {
        return new Promise((resolve, reject) => {
            try {
                app.use('/', router);
                const userController = new UserController(router, services.user, logger, statusHandler, '/api/user');
                const githubController = new GithubController(router, services.github, logger, statusHandler, '/api/github');
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = ControllerUtil;
