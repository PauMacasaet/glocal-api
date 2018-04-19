const knex = require('../../knex'); // the connection

// select * from activities where assignedSystemsEngineer @> array['Isaiah Solomon'];
module.exports = {
    getAll() {
        return knex('activities')
        .leftJoin(
            'service_reports',
            'activities.timeOuts',
            '=', 'service_reports.timeOuts'
        )
        .join(
            'contact_person', 
            'activities.client', 
            '=', 'contact_person.client'
        )
        .select( 
            'activities.activityNo', 
            'activities.trackingNo AS glocalId',
            'service_reports.sr_number',
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
            'activities.assignedSystemsEngineer'
        )
        .groupBy(
            'activities.assignedSystemsEngineer', 
            'activities.activityNo', 
            'contact_person.client',
            'contact_person.personName'
        )
        .orderBy('activities.timeOuts', 'desc');
    },
    getOne(name) {
        return knex('activities')
        .leftJoin(
            'service_reports',
            'activities.timeOuts',
            '=', 'service_reports.timeOuts'
        )
        .join(
            'contact_person', 
            'activities.client', 
            '=', 'contact_person.client'
        )
        .select(
            'activities.activityNo', 
            'activities.trackingNo AS glocalId',
            'service_reports.sr_number',
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
            'activities.assignedSystemsEngineer'
        )
        .groupBy(
            'activities.assignedSystemsEngineer', 
            'activities.activityNo',
            'contact_person.client',
            'contact_person.personName'
        )
        .where('activities.assignedSystemsEngineer', '@>', name)
        .orderBy('activities.timeOuts', 'desc');
    }
}