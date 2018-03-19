const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('case_monitoring');
    },
    getOne(customer) {
        return knex('case_monitoring').where('customer', customer);
    }
}