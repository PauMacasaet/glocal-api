const knex = require('../../knex'); // the connection

module.exports = {
    create(service_report) {
        return knex('service_report')
            .insert(service_report, '*')
            .select('*')
            .from('activities')
            .where('typeOfActivity', 'Remote');
    },
    update(sr_no, service_report) {
        return knex('service_report')
            .where('activityNo', sr_no)
            .update(service_report, '*');
    },
}