const BaseUtil = require('./BaseUtil');

class ObjectUtil extends BaseUtil {
    static isEmpty(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    }
}

module.exports = ObjectUtil;
