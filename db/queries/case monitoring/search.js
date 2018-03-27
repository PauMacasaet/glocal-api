const knex = require('../../knex'); // the connection

module.exports = {
    getOne(search) {
        return knex('case_monitoring')
        .join(
            'client', 
            'client.accountName', 
            '=', 'case_monitoring.customer'
        )
        .leftJoin(
            'activities', 
            'activities.trackingNo', 
            '=', 'case_monitoring.glocalId'
        )
        .select(
            'case_monitoring.glocalId', 
            'case_monitoring.vendorCaseId', 
            'case_monitoring.dateIdCreated', 
            'client.accountManager', 
            'case_monitoring.case_status', 
            'case_monitoring.caseDescription', 
            'case_monitoring.caseTitle', 
            'case_monitoring.customer', 
            'case_monitoring.dateRaised', 
            'case_monitoring.productName', 
            'case_monitoring.severity', 
            'case_monitoring.systemsEngineerLead', 
            'case_monitoring.vendor', 
            'activities.timeOuts AS date_last_updated'
        )
        .where('case_monitoring.customer', 'like', `%${search}%`)
        .orWhere('case_monitoring.caseTitle', 'like', `%${search}%`)
        .orWhere('case_monitoring.caseDescription', 'like', `%${search}%`)
        .orWhere('case_monitoring.productName', 'like', `%${search}%`)
        .orderBy('case_monitoring.glocalId', 'asc');
    }
}