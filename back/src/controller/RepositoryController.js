const BaseController = require('./BaseController');
const AccessGranted = require('../middleware/AccessGranted');
const MessageUtil = require('../util/MessageUtil');

class RepositoryController extends BaseController {
    registerRoutes(routePreffix) {
        this.router.route(`${routePreffix}`).get(AccessGranted.restricted, this.findAllByOwner.bind(this));
    }

    findAllByOwner(req, res) {
        if (this.checkSession(req.session)) {
            this.service.findAllByOwnerAndDate(req.session.user.id)
                .then(response => this.statusHandler.sendJson(res, this.statusHandler.ok, response))
                .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err));
        } else {
            this.statusHandler.sendJson(res, this.statusHandler.forbidden, MessageUtil.getErrors().NOT_CONNECTED.fr);
        }
    }
}

module.exports = RepositoryController;
