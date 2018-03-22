const knex = require('../../knex'); // the connection

module.exports = {
    getOne(filter) {
        return knex
        .select('glocalId', 'customer', 'case_status', 'severity', 'caseTitle', 'productName', 'dateRaised')
        .from('case_monitoring');
        //.where('customer', filter);
        // .orWhere('case_status', filter)
        // .orWhere('assignedSystemsEngineer', filter)
        // .orWhere('severity', filter)
        // .orWhere('vendor', filter)
        // .orWhere('productName', filter)
        // .orWhere('dateRaised', filter);
    }
}