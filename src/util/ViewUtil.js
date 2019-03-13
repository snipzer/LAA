const BaseUtil = require('./BaseUtil');


class ViewUtil extends BaseUtil {
    static getViews() {
        return {
            INDEX: {
                name: 'index',
                properties: {
                    title: 'Home',
                    test: 'toto',
                }
            },
            LOGIN: {
                name: 'login',
                properties: {
                    title: 'login'
                }
            }
        };
    }
}

module.exports = ViewUtil;
