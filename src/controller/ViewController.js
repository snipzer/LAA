const BaseController = require('./BaseController');
const AccessGranted = require('../middleware/AccessGranted');
const ViewUtil = require('../util/ViewUtil');

class ViewController extends BaseController {
    constructor(router, service, logger, statusHandler, routePreffix) {
        super(router, service, logger, statusHandler, routePreffix);
        this.views = ViewUtil.getViews();
    }

    registerRoutes() {
        this.router.route('/').get(AccessGranted.public, this.index.bind(this));
        this.router.route('/page/login').get(AccessGranted.public, this.login.bind(this));
    }

    index(req, res) {
        const index = ViewUtil.getViews().INDEX;
        res.render(index.name, index.properties);
    }

    login(req, res) {
        const login = ViewUtil.getViews().LOGIN;
        res.render(login.name, login.properties);
    }
}

module.exports = ViewController;
