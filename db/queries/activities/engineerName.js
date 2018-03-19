const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities').orderBy('activityNo', 'asc');
    },
    getOne(engineerName) {
        return knex.select('productName', 'trackingNo', 'engid', 'engineerName as engineer_surname', 'activityPerformed', 'nextActivity', 'recommendations').from('activities').where('engineerName', engineerName);
    }
}