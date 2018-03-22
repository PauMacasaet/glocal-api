const knex = require('../../knex'); // the connection

module.exports = {
    getOne(search) {
        return knex
        .select('glocalId', 'vendorCaseId', 'dateIdCreated', 'assignedAccountManager', 'assignedSystemsEngineer', 'case_status', 'caseDescription', 'caseTitle', 'customer', 'dateRaised', 'productName', 'severity', 'systemsEngineerLead', 'vendor')
        .from('case_monitoring')
        .where('customer', 'like', `%${search}%`)
        .orWhere('caseTitle', 'like', `%${search}%`)
        .orWhere('caseDescription', 'like', `%${search}%`)
        .orWhere('productName', 'like', `%${search}%`);
    }
}