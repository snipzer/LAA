const BaseController = require('./BaseController');
const AccessGranted = require('../middleware/AccessGranted');

class RepositoryController extends BaseController {
    registerRoutes(routePreffix) {
        this.router.route(`${routePreffix}/:userId`).get(AccessGranted.restricted, this.findAllByOwner.bind(this));
    }

    findAllByOwner(req, res) {
        this.service.findAllByOwnerAndDate(req.params.userId)
            .then(response => this.statusHandler.sendJson(res, this.statusHandler.ok, response))
            .catch(err => this.statusHandler.sendJson(res, this.statusHandler.internalServerError, err));
    }
}

module.exports = RepositoryController;
