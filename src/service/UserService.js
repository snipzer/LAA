const BaseService = require('./BaseService');
const BcryptUtil = require('../util/BcryptUtil');
const ErrorUtil = require('../util/ErrorUtil');
const AccessGranted = require('../middleware/AccessGranted');

class UserService extends BaseService {
    constructor(daos, services,logger) {
        super(logger);
        this.dao = daos.user;
        this.githubService = services.github;
    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            this.dao.getOneByMail(email).then((result) => {
                BcryptUtil.validPassword(result.entityData.password, password).then((res) => {
                    if (res === true) {
                        const generatedToken = AccessGranted.generateToken(result.entityData.id);
                        this.githubService.updateClientUrl(result.entityData.github_token);
                        resolve({ user: result.entityData, token: generatedToken });
                    } else {
                        reject(new Error(ErrorUtil.getMessages().INVALID_CREDENTIAL));
                    }
                    resolve(res === true);
                }).catch(err => reject(err));
            }).catch(err => reject(err));
        });
    }

    logout(request) {
        return new Promise((resolve, reject) => {
            try {
                request.session.user = undefined;
                this.githubService.updateClientUrl(process.env.GITHUB_TOKEN);
            } catch (err) {
                reject(err);
            }
        });
    }

    updateUser(user) {
        return new Promise((resolve, reject) => {
            user.password = undefined;
            this.dao.update(user)
                .then(result => resolve(result.entityData))
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
