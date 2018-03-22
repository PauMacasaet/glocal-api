const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities');
    },
    getOne(activityNo) {
        return knex('activities')
        .where('activityNo', activityNo);
    },
    create(activity) {
        return knex('activities').insert(activity, '*');
    },
    update(activityNo, activity) {
        return knex('activities').where('activityNo', activityNo).update(activity);
    }, 
    delete(activityNo) {
        return knex('activities').where('activityNo', activityNo).del();
    }
}