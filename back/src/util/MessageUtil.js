const BaseUtil = require('./BaseUtil');

class MessageUtil extends BaseUtil {
    static getErrors() {
        return {
            INVALID_CREDENTIAL: {
                key: 'invalid_credential',
                fr: 'Les informations de connexion sont incorrectes',
                en: 'Incorrect credential information'
            },
        };
    }

    static getInfos() {
        return {
            DECONNECTED: {
                key: 'deconnected',
                fr: 'Vous avez bien été déconnecté',
                en: 'You have been successfully disconnected'
            },
        };
    }
}

module.exports = MessageUtil;
