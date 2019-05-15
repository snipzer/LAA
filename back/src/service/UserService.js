const BaseService = require('./BaseService');
const BcryptUtil = require('../util/BcryptUtil');
const MessageUtil = require('../util/MessageUtil');
const AccessGranted = require('../middleware/AccessGranted');
const DatastoreUtil = require('../util/DatastoreUtil');

class UserService extends BaseService {
    constructor(daos, services,logger) {
        super(services, logger);
        this.dao = daos.user;
    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            this.dao.getOneByMail(email).then((result) => {
                BcryptUtil.validPassword(result.entityData.password, password).then((res) => {
                    if (res === true) {
                        const generatedToken = AccessGranted.generateToken(result.entityData.id);
                        this.services.github.updateClientUrl(result.entityData.github_token);

                        resolve({ user: DatastoreUtil.getEntityInformation(result), token: generatedToken });
                    } else {
                        reject(new Error(MessageUtil.getErrors().INVALID_CREDENTIAL.fr));
                    }
                    resolve(res === true);
                }).catch(err => this.rejectAndLogError(reject, err.message));
            }).catch(err => this.rejectAndLogError(reject, err.message));
        });
    }

    logout(request) {
        return new Promise((resolve, reject) => {
            try {
                request.session.user = undefined;
                this.services.github.updateClientUrl(process.env.GITHUB_TOKEN);
                resolve(MessageUtil.getInfos().DECONNECTED.fr);
            } catch (err) {
                this.rejectAndLogError(reject, err.message);
            }
        });
    }

    updateUser(user) {
        return new Promise((resolve, reject) => {
            user.password = undefined;
            user.github_organization = undefined;
            this.dao.update(user)
                .then(result => resolve(DatastoreUtil.getEntityInformation(result)))
                .catch(err => this.rejectAndLogError(reject, err.message));
        });
    }

    createUser(user) {
        return new Promise((resolve, reject) => {
            BcryptUtil.generatePassword(user.password).then((hash) => {
                user.password = hash;
                user.createdOn = new Date();
                this.dao.insert(user)
                    .then(result => resolve(result))
                    .catch(err => this.rejectAndLogError(reject, err.message));
            }).catch(err => this.rejectAndLogError(reject, err.message));
        });
    }

    deleteUser(userId) {
        return new Promise((resolve, reject) => {
            this.dao.deleteById(userId)
                .then(user => resolve(user))
                .catch(err => this.rejectAndLogError(reject, err.message));
        });
    }

    getUser(userId) {
        return new Promise((resolve, reject) => {
            this.dao.getById(userId)
                .then(result => resolve(DatastoreUtil.getEntityInformation(result)))
                .catch(err => this.rejectAndLogError(reject, err.message));
        });
    }

    findUsers() {
        return new Promise((resolve, reject) => {
            this.dao.findAll()
                .then(result => resolve(result))
                .catch(err => this.rejectAndLogError(reject, err.message));
        });
    }
}

module.exports = UserService;
