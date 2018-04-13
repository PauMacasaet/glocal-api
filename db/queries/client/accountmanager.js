const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('client')
            .select(
                'accountName', 
                knex.raw('contact_details[0:2][5] AS Customer_Name, contact_details[2:2][5] AS Email, contact_details[3:3][5] AS Contact_Number'), 
                'company_address', 
                'accountManager'
            );
    },
    getOne(accountManager) {
        return knex('client')
            .select(
                'accountName', 
                knex.raw('contact_details[0:2][5] AS Customer_Name, contact_details[2:2][5] AS Email, contact_details[3:3][5] AS Contact_Number'), 
                'company_address', 
                'accountManager'
            )
            .where('accountManager', accountManager);
    }
}