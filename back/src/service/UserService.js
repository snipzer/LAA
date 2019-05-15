const BaseService = require('./BaseService');
const BcryptUtil = require('../util/BcryptUtil');
const MessageUtil = require('../util/MessageUtil');
const AccessGranted = require('../middleware/AccessGranted');
const DatastoreUtil = require('../util/DatastoreUtil');

class UserService extends BaseService {
    constructor(daos, services, logger) {
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
                        reject(new Error(MessageUtil.getErrors().INVALID_CREDENTIAL.fr).message);
                    }
                }).catch(err => this.rejectAndLogError(reject, err.message));
            }).catch((err) => {
                if (err.message === 'User not found') {
                    reject(new Error(MessageUtil.getErrors().INVALID_CREDENTIAL.fr).message);
                } else {
                    this.rejectAndLogError(reject, err.message);
                }
            });
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

    updateUser(session, user) {
        return new Promise((resolve, reject) => {
            if (session.user.id !== user.id) {
                reject(new Error(MessageUtil.getErrors().UPDATE_OTHER_USER.fr));
            } else {
                user.password = undefined;
                this.dao.update(user)
                    .then(result => resolve(DatastoreUtil.getEntityInformation(result)))
                    .catch(err => this.rejectAndLogError(reject, err.message));
            }
        });
    }

    updatePassword(session, userId, oldUserPassword, userPassword, userPasswordConfirm) {
        return new Promise((resolve, reject) => {
            if (userPasswordConfirm === userPassword) {
                this.dao.getById(userId).then((result) => {
                    BcryptUtil.validPassword(result.entityData.password, oldUserPassword).then((res) => {
                        if (res === true) {
                            if (session.user.id !== userId) {
                                this.rejectAndLogError(reject, new Error(MessageUtil.getErrors().UPDATE_OTHER_USER.fr).message);
                            } else {
                                BcryptUtil.generatePassword(userPassword).then((hash) => {
                                    this.dao.update({ id: userId, password: hash })
                                        .then(updatedUser => resolve(DatastoreUtil.getEntityInformation(updatedUser)))
                                        .catch(err => this.rejectAndLogError(reject, err.message));
                                }).catch(err => this.rejectAndLogError(reject, err.message));
                            }
                        } else {
                            reject(new Error(MessageUtil.getErrors().INVALID_CREDENTIAL.fr));
                        }
                    }).catch(err => this.rejectAndLogError(reject, err.message));
                }).catch(err => this.rejectAndLogError(reject, err.message));
            } else {
                this.rejectAndLogError(reject, new Error(MessageUtil.getErrors().NOT_SAME_PASSWORD.fr).message);
            }
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

    deleteUser(session, userId) {
        return new Promise((resolve, reject) => {
            if (session.user.id !== userId) {
                reject(new Error(MessageUtil.getErrors().DELETE_OTHER_USER.fr));
            } else {
                this.getUser(userId).then((user) => {
                    if (user !== null) {
                        this.services.repository.deleteAllByOwner(userId).then(() => {
                            this.dao.deleteById(userId)
                                .then(result => resolve(result))
                                .catch(err => this.rejectAndLogError(reject, err.message));
                        }).catch(err => this.rejectAndLogError(reject, err.message));
                    } else {
                        reject(new Error(MessageUtil.getErrors().USER_NOT_FOUND.fr));
                    }
                }).catch(err => this.rejectAndLogError(reject, err.message));
            }
        });
    }

    getUser(userId) {
        return new Promise((resolve, reject) => {
            this.dao.getById(userId)
                .then(result => resolve(DatastoreUtil.getEntityInformation(result)))
                .catch(err => this.rejectAndLogError(reject, err.message));
        });
    }
}

module.exports = UserService;
