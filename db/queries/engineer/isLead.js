const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('engineer');
    },
    getOne(isLead) {
        return knex('engineer').where('isLead', isLead);
    }
}