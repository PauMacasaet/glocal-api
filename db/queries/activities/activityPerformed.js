const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities')
            .orderBy('activityNo', 'asc');
    },
    getOne(activityPerformed) {
        return knex('activities')
            .where('activityPerformed', activityPerformed);
    }, 
    getByUser(name) {
        return knex('activities')
            .where('assignedSystemsEngineer', name);
    }
}