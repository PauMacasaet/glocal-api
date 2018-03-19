const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('case_monitoring');
    },
    getOne(caseDescription) {
        return knex('case_monitoring').where('caseDescription', caseDescription);
    }
}