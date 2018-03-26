const knex = require('../../knex'); // the connection

module.exports = {
    getOne(search) {
        return knex('case_monitoring')
        .join('client', 'client.accountName', '=', 'case_monitoring.customer')
        .select('case_monitoring.glocalId', 'case_monitoring.vendorCaseId', 'case_monitoring.dateIdCreated', 'client.accountManager', 'case_monitoring.case_status', 'case_monitoring.caseDescription', 'case_monitoring.caseTitle', 'case_monitoring.customer', 'case_monitoring.dateRaised', 'case_monitoring.productName', 'case_monitoring.severity', 'case_monitoring.systemsEngineerLead', 'case_monitoring.vendor', 'activities.timeOuts AS date_last_updated')
        .where('customer', 'like', `%${search}%`)
        .orWhere('caseTitle', 'like', `%${search}%`)
        .orWhere('caseDescription', 'like', `%${search}%`)
        .orWhere('productName', 'like', `%${search}%`)
        .orderBy('glocalId', 'asc');
    }
}