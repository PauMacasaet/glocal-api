const knex = require('../../knex'); // the connection

// select * from activities where assignedSystemsEngineer @> array['Isaiah Solomon'];
module.exports = {
    getAll() {
        return knex('activities')
        .select('activityNo', 'productName', 'client', 'typeOfActivity', 'purposeOfVisit', 'activityPerformed', 'nextActivity', 'recommendations', 'assignedSystemsEngineer AS Engineers');
    },
    getOne(name) {
        return knex('activities')
        .select('activityNo', 'productName', 'client', 'typeOfActivity', 'purposeOfVisit', 'activityPerformed', 'nextActivity', 'recommendations', 'assignedSystemsEngineer AS Engineers')
        .where('assignedSystemsEngineer', '@>', name);
    }
}