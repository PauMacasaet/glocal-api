const knex = require('../../knex'); // the connection

// select * from activities where assignedSystemsEngineer @> array['Isaiah Solomon'];
module.exports = {
    getAll() {
        return knex('activities')
        .select('assignedSystemsEngineer AS Engineers', 'activityNo', 'productName', 'client', 'typeOfActivity', 'purposeOfVisit', 'activityPerformed', 'nextActivity', 'recommendations')
        .groupBy('assignedSystemsEngineer', 'activityNo');
    },
    getOne(name) {
        return knex('activities')
        .select('assignedSystemsEngineer AS Engineers', 'activityNo', 'productName', 'client', 'typeOfActivity', 'purposeOfVisit', 'activityPerformed', 'nextActivity', 'recommendations')
        .groupBy('assignedSystemsEngineer', 'activityNo')
        .where('assignedSystemsEngineer', '@>', name);
    }
}