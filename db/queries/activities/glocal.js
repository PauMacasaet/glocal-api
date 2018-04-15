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
            'activities.addres AS address',
            'contact_person.personName', 
            'activities.typeOfActivity', 
            'activities.purposeOfVisit', 
            'activities.activityPerformed', 
            'activities.nextActivity', 
            'activities.recommendations', 
            'activities.timeIn', 
            'activities.timeOuts', 
            'activities.assignedSystemsEngineer',
            knex.raw(
                `row_number() over (partition by ?? order by ?? asc) AS service_report_no`, 
                ['typeOfActivity', 'activityNo']
            )
        )
        .orderBy('activities.timeOuts', 'desc');
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
            'activities.addres AS address',
            'contact_person.personName', 
            'activities.typeOfActivity', 
            'activities.purposeOfVisit', 
            'activities.activityPerformed', 
            'activities.nextActivity', 
            'activities.recommendations', 
            'activities.timeIn', 
            'activities.timeOuts', 
            'activities.assignedSystemsEngineer',
            'service_report_no'
        )
        .where('activities.trackingNo', tracking)
        .orderBy('activities.timeOuts', 'desc');
    }
}