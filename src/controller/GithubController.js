const BaseController = require('./BaseController');
const AccessGranted = require('../middleware/AccessGranted');

class GithubController extends BaseController {
    registerRoutes(routePreffix) {
        this.router.route(`${routePreffix}`).get(AccessGranted.public, this.testQuery.bind(this));
    }

    testQuery(req, res) {
        this.service.testQuery()
            .then(user => this.statusHandler.sendJson(res, this.statusHandler.ok, user))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err.message));
    }
}

module.exports = GithubController;
