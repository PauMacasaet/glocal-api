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
            'activities.trackingNo AS glocalId', 
            'activities.activityNo', 
            'activities.productName', 
            'contact_person.client', 
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
        .orderBy('activities.trackingNo', 'asc');
    },
    getOne(trackingNo) {
        return knex('activities')
        .join('contact_person', 'activities.client', '=', 'contact_person.client')
        .select(
            'activities.trackingNo AS glocalId', 
            'activities.activityNo', 
            'activities.productName', 
            'contact_person.client', 
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
        .where('activities.trackingNo', trackingNo)
        .orderBy('activities.trackingNo', 'asc');
    }
}