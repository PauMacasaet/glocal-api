const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('engineer');
    },
    getOne(department) {
        return knex('engineer').where('department', department);
    }
}