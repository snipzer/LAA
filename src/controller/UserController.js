const BaseController = require('./BaseController');
const AccessGranted = require('../middleware/AccessGranted');

class UserController extends BaseController {
    registerRoutes(routePreffix) {
        this.router.route(`${routePreffix}`).get(AccessGranted.public, this.findUsers.bind(this));
        this.router.route(`${routePreffix}`).post(AccessGranted.public, this.createUser.bind(this));
    }

    createUser(req, res) {
        console.log(req.body);
        this.service.createUser(req.body)
            .then(user => this.statusHandler.sendJson(res, this.statusHandler.ok, user))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err.message));
    }

    findUsers(req, res) {
        this.service.findUsers()
            .then(users => this.statusHandler.sendJson(res, this.statusHandler.ok, users))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err.message));
    }
}

module.exports = UserController;
