const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex.select('accountName', 'accountManager').from('client');
    },
    getOne(accountManager) {
        return knex('client').where('accountManager', accountManager);
    }
}