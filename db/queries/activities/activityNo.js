const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities')
        .leftJoin(
            'service_reports',
            'activities.timeOuts',
            '=', 'service_reports.timeOuts'
        )
        .join(
            'client', //client.accountName
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
                `concat_ws(' - ', to_char(??, 'YY'), ??::text) as sr_number_year`,
                ['activities.timeIn', 'service_reports.sr_number']
            ),
            'service_reports.sr_number',
            'activities.productName', 
//            'activities.client', 
//            'activities.addres AS address',
            'client.accountName as client',
            'client.company_address as address',
            'activities.typeOfActivity',
            'activities.purposeOfVisit', 
            'activities.activityPerformed', 
            'activities.nextActivity', 
            'activities.recommendations', 
            'activities.timeIn', 
            'activities.timeOuts', 
            'activities.assignedSystemsEngineer',
            'activities.point_person',
            knex.raw(
                `(date_part('hour', ??::timestamp - ??::timestamp) * 60 + date_part('minute', ??::timestamp - ??::timestamp))/60 as time_elapsed`,
                ['activities.timeOuts', 'activities.timeIn', 'activities.timeOuts', 'activities.timeIn']
            )
        )
        .orderBy('activities.activityNo', 'desc');
    },
    getOne(activityNo) {
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
                `concat_ws(' - ', to_char(??, 'YY'), ??::text) as sr_number_year`,
                ['activities.timeIn', 'service_reports.sr_number']
            ),
            'service_reports.sr_number',
            'activities.productName', 
//            'activities.client', 
//            'activities.addres AS address',
            'client.accountName as client',
            'client.company_address as address',
            'activities.typeOfActivity',
            'activities.purposeOfVisit', 
            'activities.activityPerformed', 
            'activities.nextActivity', 
            'activities.recommendations', 
            'activities.timeIn', 
            'activities.timeOuts', 
            'activities.assignedSystemsEngineer',
            'activities.point_person',
            knex.raw(
                `(date_part('hour', ??::timestamp - ??::timestamp) * 60 + date_part('minute', ??::timestamp - ??::timestamp))/60 as time_elapsed`,
                ['activities.timeOuts', 'activities.timeIn', 'activities.timeOuts', 'activities.timeIn']
            )
        )
        .where('activityNo', activityNo)
        .orderBy('activities.activityNo', 'asc');
    },
    create(activity) {
        return knex('activities').insert(activity, '*');
    },
    update(activityNo, activity) {
        return knex('activities').where('activityNo', activityNo).update(activity, '*');
    }, 
    delete(activityNo) {
        return knex('activities').where('activityNo', activityNo).del();
    }
}