const BaseModel = require('./BaseModel');

class RepositoryModel extends BaseModel {
    createModel() {
        const { Schema } = this.connexion;
        this.Model = new Schema({
            reponame: { type: String, required: true },
            stargazer: { type: Number, required: true },
            url: { type: String, required: true },
            users: { type: String, required: true },
            total_users: { type: Number, required: true },
            owner: { type: String, required: true },
            createdOn: {
                type: Date, read: true
            }
        });
    }
}

module.exports = RepositoryModel;
