const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities').orderBy('activityNo', 'asc');
    },
    getOne(typeOfActivity) {
        return knex('activities').where('typeOfActivity', typeOfActivity);
    }
}