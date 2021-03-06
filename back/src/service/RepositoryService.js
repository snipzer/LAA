const BaseService = require('./BaseService');

class RepositoryService extends BaseService {
    constructor(daos, services, logger) {
        super(services, logger);
        this.dao = daos.repository;
    }

    findAllByOwnerAndDate(owner) {
        return new Promise((resolve, reject) => {
            this.dao.findAllByOwnerAndDate(owner)
                .then(result => resolve(result.entities))
                .catch(err => this.rejectAndLogError(reject, err));
        });
    }

    deleteAllByOwner(owner) {
        return new Promise((resolve, reject) => {
            this.dao.findAllByOwnerAndDate(owner).then((result) => {
                const promiseArray = [];
                result.entities.forEach((entity) => {
                    promiseArray.push(this.dao.deleteById(entity.id));
                });
                Promise.all(promiseArray)
                    .then(() => resolve())
                    .catch(err => this.rejectAndLogError(reject, err));
            }).catch(err => this.rejectAndLogError(reject, err));
        });
    }
}

module.exports = RepositoryService;
