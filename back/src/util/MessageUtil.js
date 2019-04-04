const BaseUtil = require('./BaseUtil');

class MessageUtil extends BaseUtil {
    static getErrors() {
        return {
            INVALID_CREDENTIAL: {
                key: 'invalid_credential',
                fr: 'Les informations de connexion sont incorrectes',
                en: 'Incorrect credential information'
            },
            NOT_CONNECTED: {
                key: 'not_connected',
                fr: 'Vous n\'êtes pas connecter',
                en: 'You are not connected'
            }
        };
    }

    static getInfos() {
        return {
            DECONNECTED: {
                key: 'disconnected',
                fr: 'Vous avez bien été déconnecté',
                en: 'You have been successfully disconnected'
            },
        };
    }
}

module.exports = MessageUtil;
