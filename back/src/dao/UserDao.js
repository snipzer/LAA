const BaseDao = require('./BaseDao');

class UserDao extends BaseDao {
    getOneByMail(mail) {
        return this.Model.findOne({ email: mail });
    }
}

module.exports = UserDao;
