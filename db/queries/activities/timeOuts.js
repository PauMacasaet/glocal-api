const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities').orderBy('activityNo', 'asc');
    },
    getOne(timeOuts) {
        return knex('activities').where('timeOuts', timeOuts);
    }
}