const BaseController = require('./BaseController');
const AccessGranted = require('../middleware/AccessGranted');

class UserController extends BaseController {
    registerRoutes(routePreffix) {
        this.router.route(`${routePreffix}`).get(AccessGranted.public, this.findUsers.bind(this));
        this.router.route(`${routePreffix}/:userId`).get(AccessGranted.public, this.getUser.bind(this));
        this.router.route(`${routePreffix}`).post(AccessGranted.public, this.createUser.bind(this));
        this.router.route(`${routePreffix}/:userId`).delete(AccessGranted.public, this.deleteUser.bind(this));
    }

    createUser(req, res) {
        this.service.createUser(req.body)
            .then(user => this.statusHandler.sendJson(res, this.statusHandler.ok, user))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err.message));
    }

    deleteUser(req, res) {
        this.service.deleteUser(req.params.userId)
            .then(result => this.statusHandler.sendJson(res, this.statusHandler.ok, result))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err.message));
    }

    findUsers(req, res) {
        this.service.findUsers()
            .then(users => this.statusHandler.sendJson(res, this.statusHandler.ok, users))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err.message));
    }

    getUser(req, res) {
        this.service.getUser(req.params.userId)
            .then(user => this.statusHandler.sendJson(res, this.statusHandler.ok, user))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err.message));
    }
}

module.exports = UserController;
