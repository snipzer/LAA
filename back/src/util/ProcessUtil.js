const BaseUtil = require('./BaseUtil');

class ProcessUtil extends BaseUtil {
    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = ProcessUtil;
