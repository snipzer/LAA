const BaseDao = require('./BaseDao');

class RepositoryDao extends BaseDao {
    findAllByOwnerAndDate(owner) {
        return this.Model.query()
            .filter('owner', '=', owner)
            .order('stargazer', { descending: true })
            .order('total_users', { descending: true })
            .run();
    }
}

module.exports = RepositoryDao;
