const BaseUtil = require('./BaseUtil');

class MessageUtil extends BaseUtil {
    static getErrors() {
        return {
            INVALID_CREDENTIAL: {
                key: 'invalid_credential',
                fr: 'Les informations de connexion sont incorrectes.',
                en: 'Incorrect credential information.'
            },
            NOT_CONNECTED: {
                key: 'not_connected',
                fr: 'Vous n\'êtes pas connecter.',
                en: 'You are not connected.'
            },
            GITHUB_BAD_GATEWAY: {
                key: 'github_bad_bateway',
                en: 'Network error: Bad Gateway'
            },
            UPDATE_OTHER_USER: {
                key: 'update_other_user',
                fr: 'Vous n\'êtes pas supposer modifier les informations d\'un autre utilisateur !',
                en: 'You should not update other user\'s information !'
            },
            DELETE_OTHER_USER: {
                key: 'delete_other_user',
                fr: 'Vous ne pouvez pas supprimer le compte d\'autre utilisateur !',
                en: 'You cannot delete other\'s account !'
            },
            USER_NOT_FOUND: {
                key: 'user_not_found',
                fr: 'L\'utilisateur est introuvable.',
                en: 'User not found.'
            },
            NOT_SAME_PASSWORD: {
                key: 'not_same_password',
                fr: 'Les nouveaux mots de passes de correspondent pas.',
                en: 'The new passwords aren\' equal.'
            }
        };
    }

    static getInfos() {
        return {
            DECONNECTED: {
                key: 'disconnected',
                fr: 'Vous avez bien été déconnecté.',
                en: 'You have been successfully disconnected.'
            },
        };
    }
}

module.exports = MessageUtil;
