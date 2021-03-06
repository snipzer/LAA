const BaseController = require('./BaseController');
const AccessGranted = require('../middleware/AccessGranted');
const MessageUtil = require('../util/MessageUtil');

class GithubController extends BaseController {
    registerRoutes(routePreffix) {
        this.router.route(`${routePreffix}`).get(AccessGranted.public, this.getUserInformation.bind(this));
        this.router.route(`${routePreffix}/rate`).get(AccessGranted.public, this.getRateLimit.bind(this));
        this.router.route(`${routePreffix}/refresh/repositories/:userId`).get(AccessGranted.restricted, this.refreshRepository.bind(this));
    }

    getUserInformation(req, res) {
        this.service.getUserInformation()
            .then(response => this.statusHandler.sendJson(res, this.statusHandler.ok, response))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err));
    }

    getRateLimit(req, res) {
        this.service.getRateLimit()
            .then(response => this.statusHandler.sendJson(res, this.statusHandler.ok, response))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err));
    }

    refreshRepository(req, res) {
        this.service.refreshRepository(req.params.userId)
            .then(response => this.statusHandler.sendJson(res, this.statusHandler.ok, response))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err));
    }
}

module.exports = GithubController;
