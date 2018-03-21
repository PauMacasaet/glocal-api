const knex = require('../../knex'); // the connection

module.exports = {
    getOne(search) {
        return knex
        .select('customer', 'caseTitle', 'caseDescription', 'productName')
        .from('case_monitoring')
        .where('customer', 'like', `${search}%`)
        .orWhere('caseTitle', 'like', `${search}%`)
        .orWhere('caseDescription', 'like', `${search}%`)
        .orWhere('productName', 'like', `${search}%`);
    }
}