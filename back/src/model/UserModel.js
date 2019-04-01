const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {
    createModel() {
        const { Schema } = this.connexion;
        this.Model = new Schema({
            email: { type: String, validate: 'isEmail', required: true },
            password: { type: String, read: true, required: true },
            github_token: { type: String, required: true },
            github_login: { type: String, required: true },
            github_organization: { type: String, required: true }
        });
    }
}

module.exports = UserModel;
