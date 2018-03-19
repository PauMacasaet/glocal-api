const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('case_monitoring');
    },
    getOne(caseTitle) {
        return knex('case_monitoring').where('caseTitle', caseTitle);
    }
}