const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('engineer').orderBy('engId', 'asc');
    },
    getOne(lastName) {
        return knex('engineer').where('lastName', lastName);
    }
}