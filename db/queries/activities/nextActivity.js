const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities').orderBy('activityNo', 'asc');
    },
    getOne(nextActivity) {
        return knex('activities').where('nextActivity', nextActivity);
    }
}