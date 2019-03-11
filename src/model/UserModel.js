const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {
    createModel() {
        const { Schema } = this.connexion;
        this.Model = new Schema({
            pseudo: { type: String, required: true },
            email: { type: String, validate: 'isEmail', required: true },
            password: { type: String, read: true, required: true },
        });
    }
}

module.exports = UserModel;
