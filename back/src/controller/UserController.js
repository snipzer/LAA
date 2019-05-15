const BaseController = require('./BaseController');
const AccessGranted = require('../middleware/AccessGranted');
const MessageUtil = require('../util/MessageUtil');

class UserController extends BaseController {
    registerRoutes(routePreffix) {
        this.router.route('/logout').get(AccessGranted.public, this.logout.bind(this));
        this.router.route('/login').post(AccessGranted.public, this.login.bind(this));
        this.router.route(`${routePreffix}`).post(AccessGranted.public, this.createUser.bind(this));
        this.router.route(`${routePreffix}/:userId`).get(AccessGranted.restricted, this.getUser.bind(this));
        this.router.route(`${routePreffix}/update`).post(AccessGranted.restricted, this.updateUser.bind(this));
        this.router.route(`${routePreffix}/updatePassword`).post(AccessGranted.restricted, this.updatePassword.bind(this));
        this.router.route(`${routePreffix}/:userId`).delete(AccessGranted.restricted, this.deleteUser.bind(this));
    }

    login(req, res) {
        this.service.login(req.body.email, req.body.password).then((userAndToken) => {
            this.saveSession(req, userAndToken.user).then(() => {
                this.statusHandler.sendJson(res, this.statusHandler.ok, userAndToken);
            }).catch(err => this.statusHandler.sendJson(res, this.statusHandler.unauthorized, err));
        }).catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err));
    }

    logout(req, res) {
        this.service.logout(req)
            .then(result => this.statusHandler.sendJson(res, this.statusHandler.ok, result))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err));
    }

    updateUser(req, res) {
        if (this.checkSession(req.session)) {
            this.service.updateUser(req.session, req.body).then((result) => {
                this.saveSession(req, result)
                    .then(() => this.statusHandler.sendJson(res, this.statusHandler.ok, result))
                    .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err));
            }).catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err));
        } else {
            this.statusHandler.sendJson(res, this.statusHandler.forbidden, MessageUtil.getErrors().NOT_CONNECTED.fr);
        }
    }

    updatePassword(req, res) {
        this.service.updatePassword(req.session, req.body.id, req.body.oldPassword, req.body.password, req.body.passwordConfirm).then((result) => {
            this.saveSession(req, result)
                .then(() => this.statusHandler.sendJson(res, this.statusHandler.ok, result))
                .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err));
        }).catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err));
    }

    createUser(req, res) {
        this.service.createUser(req.body)
            .then(result => this.statusHandler.sendJson(res, this.statusHandler.ok, result))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err));
    }

    deleteUser(req, res) {
        if (this.checkSession(req.session)) {
            this.service.deleteUser(req.session, req.params.userId)
                .then(result => this.statusHandler.sendJson(res, this.statusHandler.ok, result))
                .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err));
        } else {
            this.statusHandler.sendJson(res, this.statusHandler.forbidden, MessageUtil.getErrors().NOT_CONNECTED.fr);
        }
    }

    getUser(req, res) {
        if (this.checkSession(req.session)) {
            this.service.getUser(req.params.userId)
                .then(user => this.statusHandler.sendJson(res, this.statusHandler.ok, user))
                .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err));
        } else {
            this.statusHandler.sendJson(res, this.statusHandler.forbidden, MessageUtil.getErrors().NOT_CONNECTED.fr);
        }
    }
}

module.exports = UserController;
