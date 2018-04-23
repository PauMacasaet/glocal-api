const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('client')
            .select(
                'accountName', 
                knex.raw('contact_details[0:1][30] AS Customer_Name, contact_details[2:2][30] AS Email, contact_details[3:3][30] AS Contact_Number, contact_details[4:4][30] as Position'), 
                'company_address', 
                'accountManager'
            );
    },
    getOne(accountManager) {
        return knex('client')
            .select(
                'accountName', 
                knex.raw('contact_details[0:1][30] AS Customer_Name, contact_details[2:2][30] AS Email, contact_details[3:3][30] AS Contact_Number, contact_details[4:4][30] as Position'), 
                'company_address', 
                'accountManager'
            )
            .where('accountManager', accountManager);
    }
}