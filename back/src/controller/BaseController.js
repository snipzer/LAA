class BaseController {
    constructor(router, service, logger, statusHandler, routePreffix) {
        this.service = service;
        this.router = router;
        this.logger = logger;
        this.statusHandler = statusHandler;
        this.registerRoutes(routePreffix);
        this.logger.info(`Instanciating ${this.constructor.name}...`);
    }

    // eslint-disable-next-line no-unused-vars
    registerRoutes(routePreffix) {
    }

    saveSession(req, user) {
        return new Promise((resolve, reject) => {
            req.session.user = user.data;
            req.session.save((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(req);
                }
            });
        });
    }

    checkSession(session) {
        return session.user !== undefined;
    }
}

module.exports = BaseController;
