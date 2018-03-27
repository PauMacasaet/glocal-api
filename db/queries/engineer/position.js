const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('user').orderBy('userid', 'asc');
    },
    getEngineer(engineer) {
        return knex('user').where('position', engineer);
    },
    getAM(manager) {
        return knex('user').where('position', manager);
    }
}