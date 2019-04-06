const BaseDao = require('./BaseDao');

class RepositoryDao extends BaseDao {
    findAllByOwnerAndDate(owner, createdOn) {
        return this.Model.query()
            .filter('owner', '=', owner)
            .filter('createdOn', '=', createdOn)
            .order('stargazer', { descending: true })
            .order('total_users', { descending: true })
            .run();
    }
}

module.exports = RepositoryDao;
