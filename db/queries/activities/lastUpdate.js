const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities')
            .distinct('trackingNo')
            .select('trackingNo', 'timeOuts AS date_last_updated', 'client', 'productName')
            .orderBy('trackingNo')
            .orderBy('timeOuts', 'desc');
    }
}