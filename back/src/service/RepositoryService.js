const BaseService = require('./BaseService');

class RepositoryService extends BaseService {
    constructor(daos, services, logger) {
        super(services, logger);
        this.dao = daos.repository;
    }

    findAllByOwnerAndDate(owner, createdOn) {
        return new Promise((resolve, reject) => {
            this.dao.findAllByOwnerAndDate(owner, createdOn)
                .then(result => resolve(result.entities))
                .catch(err => this.rejectAndLogError(reject, err));
        });
    }
}

module.exports = RepositoryService;
