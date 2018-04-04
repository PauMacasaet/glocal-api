const knex = require('../../knex'); // the connection

module.exports = {
    getAll(query) {
        return knex.select('client', 'personName AS Contact_Person').from('contact_person')
        
    },
    getOne(personName) {
        return knex.select('client', 'personName AS Contact_Person').from('contact_person').where('personName', personName);
    }, 
    create(contact_person) {
        return knex('contact_person').insert(contact_person, '*');
    },
    update(personName, contact_person) {
        return knex('contact_person').where('personName', personName).update(contact_person, '*');
    },
    delete(personName) {
        return knex('contact_person').where('personName', personName).del();
    }
}