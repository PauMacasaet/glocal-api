const knex = require('../../knex'); // the connection

module.exports = {
    getAll(query) {
        const knexQuery = knex('activities')
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
            knex.raw(
                `concat_ws(' - ', date_part('year', ??)::text, ??::text) as glocal_id`,
                ['activities.timeIn', 'activities.trackingNo']
            ),
            'activities.trackingNo AS glocalId', 
            knex.raw(
                `concat_ws(' - ', date_part('year', ??)::text, ??::text) as sr_number_year`,
                ['activities.timeIn', 'service_reports.sr_number']
            ),
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
            'activities.assignedSystemsEngineer',
            'activities.point_person'
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
            knex.raw(
                `concat_ws(' - ', date_part('year', ??)::text, ??::text) as glocal_id`,
                ['activities.timeIn', 'activities.trackingNo']
            ),
            'activities.trackingNo AS glocalId', 
            knex.raw(
                `concat_ws(' - ', date_part('year', ??)::text, ??::text) as sr_number_year`,
                ['activities.timeIn', 'service_reports.sr_number']
            ),
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
            'activities.assignedSystemsEngineer',
            'activities.point_person'
)
        .where('activities.trackingNo', tracking)
        .orderBy('activities.timeOuts', 'desc');
    }
}