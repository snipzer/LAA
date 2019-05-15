const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {
    createModel() {
        const { Schema } = this.connexion;
        this.Model = new Schema({
            email: { type: String, validate: 'isEmail', required: true },
            // TODO password read a true, si on le met a false on ne peut plus se logger car on ne récupère pas le password
            password: { type: String, read: true, required: true },
            github_token: { type: String, required: true },
            github_login: { type: String, required: true },
            github_organization: { type: String, required: true },
            createdOn: {
                type: Date, default: this.connexion.defaultValues.NOW, write: false, read: true
            }
        });
    }
}

module.exports = UserModel;
