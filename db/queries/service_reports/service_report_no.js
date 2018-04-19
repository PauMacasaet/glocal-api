const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('service_reports')
        .join(
            'contact_person',
            'service_reports.client',
             '=', 'contact_person.client'
        )
        .select(
            knex.raw(
                `concat_ws(' - ', date_part('year', ??)::text, ??::text) as sr_number_year`,
                ['service_reports.timeIn', 'service_reports.sr_number']
            ),
            'service_reports.sr_number',
            'service_reports.trackingNo AS glocalId', 
            'service_reports.productName', 
            'contact_person.client', 
            'service_reports.addres AS address',
            'contact_person.personName', 
            'service_reports.typeOfActivity',
            'service_reports.purposeOfVisit', 
            'service_reports.activityPerformed', 
            'service_reports.nextActivity', 
            'service_reports.recommendations', 
            'service_reports.timeIn', 
            'service_reports.timeOuts', 
            'service_reports.assignedSystemsEngineer',
            'service_reports.point_person'
        )
        .orderBy('service_reports.timeOuts', 'desc');
    },
    getOne(sr_number) {
        return knex('service_reports')
        .join(
            'contact_person', 
            'service_reports.client', 
            '=', 'contact_person.client'
        )
        .select(
            knex.raw(
                `concat_ws(' - ', date_part('year', ??)::text, ??::text) as sr_number_year`,
                ['service_reports.timeIn', 'service_reports.sr_number']
            ),
            'service_reports.sr_number',
            'service_reports.trackingNo AS glocalId', 
            'service_reports.productName', 
            'contact_person.client', 
            'service_reports.addres AS address',
            'contact_person.personName', 
            'service_reports.typeOfActivity',
            'service_reports.purposeOfVisit', 
            'service_reports.activityPerformed', 
            'service_reports.nextActivity', 
            'service_reports.recommendations', 
            'service_reports.timeIn', 
            'service_reports.timeOuts', 
            'service_reports.assignedSystemsEngineer',
            'service_reports.point_person'
        )
        .where('sr_number', sr_number)
        .orderBy('service_reports.sr_number', 'asc');
    },
    create(service_report) {
        const knexQuery = knex('service_reports')
            .insert(service_report, '*')
        return knexQuery;
    },
    getTracking(tracking){
        return knex('service_reports')
        .join(
            'contact_person', 
            'service_reports.client', 
            '=', 'contact_person.client'
        )
        .select(
            knex.raw(
                `concat_ws(' - ', date_part('year', ??)::text, ??::text) as sr_number_year`,
                ['service_reports.timeIn', 'service_reports.sr_number']
            ),
            'service_reports.sr_number',
            'service_reports.trackingNo AS glocalId', 
            'service_reports.productName', 
            'contact_person.client', 
            'service_reports.addres AS address',
            'contact_person.personName', 
            'service_reports.typeOfActivity',
            'service_reports.purposeOfVisit', 
            'service_reports.activityPerformed', 
            'service_reports.nextActivity', 
            'service_reports.recommendations', 
            'service_reports.timeIn', 
            'service_reports.timeOuts', 
            'service_reports.assignedSystemsEngineer',
            'service_reports.point_person'
        )
        .where('trackingNo', tracking)
        .orderBy('service_reports.sr_number', 'asc');
    },
    update(sr_number, service_report) {
        return knex('service_reports').where('sr_number', sr_number).update(service_report, '*');
    }, 
    delete(sr_number) {
        return knex('service_reports').where('sr_number', sr_number).del();
    }
}