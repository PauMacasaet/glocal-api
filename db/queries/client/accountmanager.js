const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('client');
    },
    getOne(accountManager) {
        return knex('client').where('accountManager', accountManager);
    }
}