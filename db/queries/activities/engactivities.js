const knex = require('../../knex'); // the connection

// select * from activities where assignedSystemsEngineer @> array['Isaiah Solomon'];
module.exports = {
    getAll() {
        return knex('activities');
    },
    getOne(name) {
        return knex('activities').where('assignedSystemsEngineer', '@>', name)
    }
}