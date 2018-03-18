const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('engineer').orderBy('engId', 'asc');
    },
    getOne(isLead) {
        return knex('engineer').where('isLead', isLead);
    }
}