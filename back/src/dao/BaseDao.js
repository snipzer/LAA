const { instances } = require('gstore-node');

class BaseDao {
    constructor(logger, model) {
        this.Model = model;
        this.connexion = instances.get('default');
        this.logger = logger;
        this.logger.info(`Instanciating ${this.constructor.name}...`);
    }

    findAll() {
        this.logger.verbose(`${this.constructor.name} - ${this.findAll.name}`);
        return this.Model.list();
    }

    getById(objectId) {
        this.logger.verbose(`${this.constructor.name} - ${this.getById.name}`);
        return this.Model.get(objectId);
    }

    insert(object) {
        this.logger.verbose(`${this.constructor.name} - ${this.insert.name}`);
        const entityData = this.Model.sanitize(object);
        const entity = new this.Model(entityData);
        const transaction = this.connexion.transaction();
        return transaction.run().then(() => {
            return entity.save(transaction).then(() => transaction.commit());
        });
    }

    update(object) {
        this.logger.verbose(`${this.constructor.name} - ${this.update.name}`);
        const objectId = object.id;
        const entityData = this.Model.sanitize(object);
        return this.Model.update(objectId, entityData);
    }

    deleteById(id) {
        this.logger.verbose(`${this.constructor.name} - ${this.deleteById.name}`);
        return this.Model.delete(id);
    }
}

module.exports = BaseDao;
