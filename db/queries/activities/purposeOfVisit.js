const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities').orderBy('activityNo', 'asc');
    },
    getOne(purposeOfVisit) {
        return knex('activities').where('purposeOfVisit', purposeOfVisit);
    }
}