const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('case_monitoring');
    },
    getOne(vendorCaseId) {
        return knex('case_monitoring')
        .where('vendorCaseId', vendorCaseId);
    }
}