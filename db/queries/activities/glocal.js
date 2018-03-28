const knex = require('../../knex'); // the connection

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
            'contact_person.company_address',
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
        .orderBy('activities.activityNo', 'asc');
    },
    getOne(tracking) {
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
            'contact_person.company_address',
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
        .where('activities.trackingNo', tracking)
        .orderBy('activities.activityNo', 'asc');
    }
}