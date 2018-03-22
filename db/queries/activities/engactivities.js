const knex = require('../../knex'); // the connection

// select * from activities where assignedSystemsEngineer @> array['Isaiah Solomon'];
module.exports = {
    getOne(name) {
        return knex.raw(`select * from activities where assignedSystemsEngineer @> array[${name}]`);
    }

    // getAll() {
    //     return knex('activities')
    //     .join('engineer', 'engineer.engId', '=', 'activities.engid')
    //     .select('activities.activityNo', 'activities.productName', 'activities.client', 'activities.contactCustomer', 'activities.typeOfActivity', 'activities.purposeOfVisit', 'activities.activityPerformed', 'activities.nextActivity', 'activities.recommendations', 'engineer.engId', 'engineer.firstName', 'engineer.lastName');
    // },
    // getOne(engId) {
    //     return knex('activities')
    //     .join('engineer', 'engineer.engId', '=', 'activities.engid')
    //     .select('activities.activityNo', 'activities.productName', 'activities.client', 'activities.contactCustomer', 'activities.typeOfActivity', 'activities.purposeOfVisit', 'activities.activityPerformed', 'activities.nextActivity', 'activities.recommendations', 'engineer.engId', 'engineer.firstName', 'engineer.lastName')
    //     .where('engineer.engId', engId);
    // }
}