const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('case_monitoring').select('severity').count('* as number_of_cases_severity').groupBy('severity');
    },
    getOne(severity) {
        return knex('case_monitoring').count('*').where('severity', severity);
    }
}