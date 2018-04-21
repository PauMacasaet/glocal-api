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
            'client', 
            'activities.client', 
            '=', 'client.accountName'
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
            'client.accountName',
            'activities.addres AS address',
            //'contact_person.personName', 
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
        .groupBy(
            'activities.assignedSystemsEngineer', 
            'activities.activityNo', 
            // 'contact_person.client',
            // 'contact_person.personName',
            'service_reports.sr_number'
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
            'client', 
            'activities.client', 
            '=', 'client.accountName'
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
            'client.accountName',
            'activities.addres AS address',
            //'contact_person.personName', 
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
        .groupBy(
            'activities.assignedSystemsEngineer', 
            'activities.activityNo',
            // 'contact_person.client',
            // 'contact_person.personName',
            'service_reports.sr_number'
        )
        .where('activities.assignedSystemsEngineer', '@>', name)
        .orderBy('activities.timeOuts', 'desc');
    }
}