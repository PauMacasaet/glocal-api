const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('case_monitoring');
    },
    getOne(dateRaised) {
        return knex('case_monitoring')
        .where('dateRaised', dateRaised);
    }
}