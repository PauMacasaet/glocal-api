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
    getOne(accountName) {
        return knex('client')
            .select(
                'accountName', 
                knex.raw('contact_details[0:2][5] AS Customer_Name, contact_details[2:2][5] AS Email, contact_details[3:3][5] AS Contact_Number'), 
                'company_address', 
                'accountManager'
            )
            .where('accountName', accountName);
    }, 
    sortClient(query) {
        const knexQuery = knex('client')
            .select(
                'accountName', 
                knex.raw('contact_details[0:2][5] AS Customer_Name, contact_details[2:2][5] AS Email, contact_details[3:3][5] AS Contact_Number'), 
                'company_address', 
                'accountManager'
            );

        if (query.accountName) {
            knexQuery.orderBy('accountName', query.accountName);
        } else if (query.company_address) {
            knexQuery.orderBy('company_address', query.company_address);
        } else if (query.accountManager) {
            knexQuery.orderBy('accountManager', query.accountManager);
        }
        
        return knexQuery;
    },
    create(client) {
        return knex('client')
            .insert(client, '*');
    },
    update(accountName, client) {
        return knex('client')
            .where('accountName', accountName)
            .update(client, '*');
    },
    delete(accountName) {
        return knex('client')
            .where('accountName', accountName).del();
    }
}