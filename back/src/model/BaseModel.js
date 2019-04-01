const { instances } = require('gstore-node');

class BaseModel {
    constructor(logger, modelName) {
        this.connexion = instances.get('default');
        this.modelName = modelName;
        this.logger = logger;
        this.Model = null;
        this.logger.info(`Instanciating ${this.modelName}Model...`);
        this.createModel();
    }

    getModel() {
        return this.Model;
    }

    createModel() {}
}

module.exports = BaseModel;
