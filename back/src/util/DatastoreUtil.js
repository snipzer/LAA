const BaseUtil = require('./BaseUtil');

class DatastoreUtil extends BaseUtil {
    static getEntityInformation(entity) {
        return {
            key: entity.entityKey,
            data: entity.entityData
        };
    }
}

module.exports = DatastoreUtil;
