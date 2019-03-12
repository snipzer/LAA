const BaseUtil = require('./BaseUtil');

class ErrorUtil extends BaseUtil {
    static getMessages() {
        return {
            INVALID_CREDENTIAL: 'invalid_credential',
        };
    }
}

module.exports = ErrorUtil;
