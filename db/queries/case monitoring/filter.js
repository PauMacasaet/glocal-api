const knex = require('../../knex'); // the connection

module.exports = {
    getOne(filter) { // join w activities
        return knex('case_monitoring')
        .select('case_monitoring.glocalId', 'case_monitoring.customer', 'case_monitoring.case_status', 'case_monitoring.systemsEngineerLead', 'activities.assignedSystemsEngineer', 'case_monitoring.severity', 'case_monitoring.caseTitle', 'case_monitoring.productName', 'case_monitoring.dateRaised')
        .leftJoin('activities', 'activities.trackingNo', '=', 'case_monitoring.glocalId');
    }
}