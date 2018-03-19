const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities').orderBy('activityNo', 'asc');
    },
    getOne(timeIn) {
        return knex('activities').where('timeIn', timeIn);
    }
}