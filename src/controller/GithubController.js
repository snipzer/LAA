const BaseController = require('./BaseController');
const AccessGranted = require('../middleware/AccessGranted');

class GithubController extends BaseController {
    registerRoutes(routePreffix) {
        this.router.route(`${routePreffix}`).get(AccessGranted.public, this.testQuery.bind(this));
        this.router.route(`${routePreffix}/rate`).get(AccessGranted.public, this.getRateLimit.bind(this));
    }

    testQuery(req, res) {
        this.service.testQuery()
            .then(response => this.statusHandler.sendJson(res, this.statusHandler.ok, response))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err.message));
    }

    getRateLimit(req, res) {
        this.service.getRateLimit()
            .then(response => this.statusHandler.sendJson(res, this.statusHandler.ok, response))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err.message));
    }
}

module.exports = GithubController;
