const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities').orderBy('activityNo', 'asc');
    },
    getOne(addres) {
        return knex('activities').where('addres', addres);
    }
}