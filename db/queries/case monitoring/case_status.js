const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('case_monitoring');
    },
    getOne(case_status) {
        return knex('case_monitoring')
        .where('case_status', case_status);
    }
}