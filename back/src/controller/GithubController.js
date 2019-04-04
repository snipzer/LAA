const BaseController = require('./BaseController');
const AccessGranted = require('../middleware/AccessGranted');
const MessageUtil = require('../util/MessageUtil');

class GithubController extends BaseController {
    registerRoutes(routePreffix) {
        this.router.route(`${routePreffix}`).get(AccessGranted.public, this.getUserInformation.bind(this));
        this.router.route(`${routePreffix}/rate`).get(AccessGranted.public, this.getRateLimit.bind(this));
        this.router.route(`${routePreffix}/repositories`).get(AccessGranted.public, this.getOrgUsersRepositories.bind(this));
    }

    getUserInformation(req, res) {
        this.service.getUserInformation()
            .then(response => this.statusHandler.sendJson(res, this.statusHandler.ok, response))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err.message));
    }

    getRateLimit(req, res) {
        this.service.getRateLimit()
            .then(response => this.statusHandler.sendJson(res, this.statusHandler.ok, response))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err.message));
    }

    getOrgUsersRepositories(req, res) {
        if (this.checkSession(req.session)) {
            this.service.getOrgUsersRepositories(req.session.user.github_organization)
                .then(response => this.statusHandler.sendJson(res, this.statusHandler.ok, response))
                .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err.message));
        } else {
            this.statusHandler.sendJson(res, this.statusHandler.forbidden, MessageUtil.getErrors().NOT_CONNECTED.fr);
        }
    }
}

module.exports = GithubController;
