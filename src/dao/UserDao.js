const BaseDao = require('./BaseDao');

class UserDao extends BaseDao {
    getOneByMail(mail) {
        return this.Model.list({ email: mail });
    }
}

module.exports = UserDao;
