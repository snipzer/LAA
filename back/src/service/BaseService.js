class BaseService {
    constructor(services, logger) {
        this.logger = logger;
        this.services = services;
        this.logger.info(`Instanciating ${this.constructor.name}...`);
    }

    rejectAndLogError(reject, error) {
        this.logger.error(error);
        return reject(error);
    }
}

module.exports = BaseService;
