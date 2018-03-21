const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities')
        .orderBy('activityNo', 'asc');
    },
    getOne(engid) {
        return knex
        .select('trackingNo', 'engid', 'productName', 'typeOfActivity', 'purposeOfVisit', 'activityPerformed', 'nextActivity', 'recommendations', 'engineerName as engineerSurname')
        .from('activities')
        .where('engid', engid);
    }
}