const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('engineer').orderBy('engId', 'asc');
    },
    getOne(engId) {
        return knex('engineer').where('engId', engId).first();
    },
    create(engineer) {
        return knex('engineer').insert(engineer, '*');
    },
    update(engId, engineer) {
        return knex('engineer').where('engId', engId).update(engineer);
    }, 
    delete(engId) {
        return knex('engineer').where('engId', engId).del();
    }
}