const BaseService = require('./BaseService');
const BcryptUtil = require('../util/BcryptUtil');


class UserService extends BaseService {
    constructor(daos, logger) {
        super(logger);
        this.dao = daos.user;
    }

    // TODO Ne pas update le mot de passe utilisateur
    updateUser(user) {
        return new Promise((resolve, reject) => {
            this.dao.update(user)
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }

    createUser(user) {
        return new Promise((resolve, reject) => {
            BcryptUtil.generatePassword(user.password).then((hash) => {
                user.password = hash;
                this.dao.insert(user)
                    .then(result => resolve(result))
                    .catch(err => reject(err));
            }).catch(err => reject(err));
        });
    }

    deleteUser(userId) {
        return new Promise((resolve, reject) => {
            this.dao.deleteById(userId)
                .then(user => resolve(user))
                .catch(err => reject(err));
        });
    }

    getUser(userId) {
        return new Promise((resolve, reject) => {
            this.dao.getById(userId)
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }

    findUsers() {
        return new Promise((resolve, reject) => {
            this.dao.findAll()
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }
}

module.exports = UserService;
