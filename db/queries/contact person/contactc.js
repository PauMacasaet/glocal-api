const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex.select('client', 'personName AS Contact_Person').from('contact_person');
    },
    getOne(client) {
        return knex.select('client', 'personName AS Contact_Person').from('contact_person').where('client', client);
    }
}