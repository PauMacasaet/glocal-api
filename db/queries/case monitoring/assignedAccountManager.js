const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('case_monitoring');
    },
    getOne(assignedAccountManager) {
        return knex('case_monitoring').where('assignedAccountManager', assignedAccountManager);
    }
}