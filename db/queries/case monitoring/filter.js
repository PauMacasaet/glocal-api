const knex = require('../../knex'); // the connection

module.exports = {
    getFilter(query) {
        const knexQuery = knex('case_monitoring')
            .leftJoin(
                'activities', 
                'activities.trackingNo', 
                '=', 'case_monitoring.glocalId'
            )
            .select(
                'case_monitoring.glocalId', 
                'case_monitoring.customer', 
                'case_monitoring.case_status', 
                'case_monitoring.systemsEngineerLead', 
                'activities.assignedSystemsEngineer', 
                'case_monitoring.severity', 
                'case_monitoring.caseTitle', 
                'case_monitoring.productName', 
                'case_monitoring.dateRaised', 
                'activities.timeOuts AS date_last_updated'
            )
        if (query.customer) {
            knexQuery.where('case_monitoring.customer', query.customer);
        }
        if (query.case_status) {
            knexQuery.where('case_monitoring.case_status', query.case_status);
        }
        if (query.assignedSystemsEngineer) {
            knexQuery.where('activities.assignedSystemsEngineer', '@>', query.assignedSystemsEngineer);
        }
        if (query.severity) {
            knexQuery.where('case_monitoring.severity', query.severity);
        }
        if (query.vendor) {
            knexQuery.where('case_monitoring.vendor', query.vendor);
        }
        if (query.productName) {
            knexQuery.where('activities.productName', '@>', query.productName);
        }
        if (query.dateRaised) {
            knexQuery.where('case_monitoring.dateRaised', query.dateRaised);
        }
        return knexQuery.orderBy('case_monitoring.glocalId', 'asc');
    }
}