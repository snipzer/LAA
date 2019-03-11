const BaseService = require('./BaseService');
const BcryptUtil = require('../util/BcryptUtil');


class UserService extends BaseService {
    constructor(daos, logger) {
        super(logger);
        this.dao = daos.user;
    }

    createUser(user) {
        return new Promise((resolve, reject) => {
            BcryptUtil.generatePassword(user.password).then((hash) => {
                user.password = hash;
                this.dao.insert(user)
                    .then(savedUser => resolve(savedUser))
                    .catch(err => reject(err));
            }).catch(err => reject(err));
        });
    }

    findUsers() {
        return new Promise((resolve, reject) => {
            this.dao.findAll()
                .then(users => resolve(users))
                .catch(err => reject(err));
        });
    }
}

module.exports = UserService;