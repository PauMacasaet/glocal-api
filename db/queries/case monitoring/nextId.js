const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex
        .select(knex.raw('last_value+1 AS next_id'))
        .from('case_monitoring_glocalId_seq');
    }
}