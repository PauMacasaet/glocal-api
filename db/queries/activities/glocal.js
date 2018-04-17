const knex = require('../../knex'); // the connection

module.exports = {
    getAll(query) {
        const knexQuery = knex('activities')
        .join(
            'contact_person', 
            'activities.client', 
            '=', 'contact_person.client'
        )
        .select(
            'activities.activityNo', 
            'activities.trackingNo AS glocalId', 
            'activities.sr_no',
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
        .orderBy('activities.timeOuts', 'desc');

        if (query.no) {
            knexQuery
                .where(
                    'activities.trackingNo', 
                    query.no
                );
        }

        return knexQuery;
    },
    getOne(tracking) {
        return knex('activities')
        .leftJoin(
            'service_reports',
            'activities.sr_no',
            '=', 'service_reports.sr_number'
        )
        .join(
            'contact_person', 
            'activities.client', 
            '=', 'contact_person.client'
        )
        .select(
            'activities.activityNo', 
            'activities.trackingNo AS glocalId', 
            'activities.sr_no',
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
        .where('activities.trackingNo', tracking)
        .orderBy('activities.timeOuts', 'desc');
    }
}