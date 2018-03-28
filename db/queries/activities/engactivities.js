const knex = require('../../knex'); // the connection

// select * from activities where assignedSystemsEngineer @> array['Isaiah Solomon'];
module.exports = {
    getAll() {
        return knex('activities')
        .join(
            'contact_person', 
            'activities.client', 
            '=', 'contact_person.client'
        )
        .select( 
            'activities.activityNo', 
            'activities.trackingNo AS glocalId',
            'activities.productName', 
            'contact_person.client',
            'activities.addres AS address',
            'contact_person.personName', 
            'activities.typeOfActivity', 
            'activities.purposeOfVisit', 
            'activities.activityPerformed', 
            'activities.nextActivity', 
            'activities.recommendations',
            'activities.timeIn',
            'activities.timeOuts',
            'activities.assignedSystemsEngineer AS Engineers'
        )
        .groupBy(
            'activities.assignedSystemsEngineer', 
            'activities.activityNo', 
            'contact_person.client',
            'contact_person.personName'
        )
        .orderBy('activities.activityNo', 'asc');
    },
    getOne(name) {
        return knex('activities')
        .join(
            'contact_person', 
            'activities.client', 
            '=', 'contact_person.client'
        )
        .select(
            'activities.activityNo', 
            'activities.trackingNo AS glocalId',
            'activities.productName', 
            'contact_person.client',
            'activities.addres AS address',
            'contact_person.personName', 
            'activities.typeOfActivity', 
            'activities.purposeOfVisit', 
            'activities.activityPerformed', 
            'activities.nextActivity', 
            'activities.recommendations',
            'activities.timeIn',
            'activities.timeOuts',
            'activities.assignedSystemsEngineer AS Engineers'
        )
        .groupBy(
            'activities.assignedSystemsEngineer', 
            'activities.activityNo',
            'contact_person.client',
            'contact_person.personName'
        )
        .where('activities.assignedSystemsEngineer', '@>', name)
        .orderBy('activities.activityNo', 'asc');
    }
}