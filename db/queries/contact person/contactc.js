const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('contact_person');
    },
    getOne(client) {
        return knex('contact_person').where('client', client);
    }
}