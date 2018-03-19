const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex.select('glocalId', 'vendorCaseId', 'dateIdCreated', 'assignedAccountManager', 'assignedSystemsEngineer', 'leads', 'case_status', 'caseDescription', 'caseTitle', 'customer', 'dateRaised', 'productName', 'severity', 'systemsEngineerLead', 'vendor').from('case_monitoring');
    },
    getOne(glocalId) {
        return knex('case_monitoring').where('glocalId', glocalId);
    },
    create(case_mon) {
        return knex('case_monitoring').insert(case_mon, '*');
    },
    update(glocalId, case_monitoring) {
        return knex('case_monitoring').where('glocalId', glocalId).update(case_monitoring);
    }, 
    delete(glocalId) {
        return knex('case_monitoring').where('glocalId', glocalId).del();
    }
}