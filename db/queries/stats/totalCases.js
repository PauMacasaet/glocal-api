const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('case_monitoring').select('case_status').count('* as NumberOfCases').groupBy('case_status');
    },
    getOne(case_status) {
        return knex('case_monitoring').count('*').where('case_status', case_status);
    }
}