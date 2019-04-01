const BaseFactory = require('./BaseFactory');
const UserModel = require('../model/UserModel');
const { instances } = require('gstore-node');
/**
 * Here we instantiate the models
 * _init instantiate the models
 * _bindRelation add relation between tables
 * _syncModels create the tables
 */
class ModelFactory extends BaseFactory {
    static initModels(models, logger) {
        return new Promise((resolve, reject) => {
            ModelFactory._init(models, logger).then(() => resolve()).catch(err => reject(err));
        });
    }

    static _init(models, logger) {
        return new Promise((resolve, reject) => {
            try {
                const gstore = instances.get('default');
                models.user = gstore.model('User', new UserModel(logger, 'user').getModel());
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = ModelFactory;
