const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('client');
    },
    getOne(accountName) {
        return knex('client').where('accountName', accountName);
    }, 
    create(client) {
        return knex('client').insert('client', '*');
    },
    update(accountName, client) {
        return knex('client').where('accountName', accountName).update(client);
    },
    delete(client) {
        return knex('client').where('accountName', accountName).del();
    }
}