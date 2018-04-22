const knex = require('../../knex'); // the connection

module.exports = {
    getAll(query) {
        const knexQuery = knex('client')
            .select(
                'accountName', 
                knex.raw('contact_details[0:2][20] AS Customer_Name, contact_details[2:2][20] AS Email, contact_details[3:3][20] AS Contact_Number'), 
                'company_address', 
                'accountManager'
            )
            .orderBy('accountName', 'asc');
        //SEARCH CLIENT
        if (query.q) {
            knexQuery.where('accountName', 'ILIKE', `%${query.q}%`)
                .orWhere('accountManager', 'ILIKE', `%${query.q}%`);
        }

        //SORT
        if (query.order_client) {
            knexQuery.orderBy('accountName', query.order_client);
        } else if (query.order_address) {
            knexQuery.orderBy('company_address', query.order_address);
        } else if (query.order_manager) {
            knexQuery.orderBy('accountManager', query.order_manager);
        }

        // PAGINATION

        if (query.limit) {
            knexQuery.limit(query.limit);
            if (query.offset) {
                knexQuery.offset(query.offset);
            }
        }
        
        return knexQuery;
    },
    getOne(accountName) {
        return knex('client')
            .select(
                'accountName', 
                knex.raw('contact_details[0:2][20] AS Customer_Name, contact_details[2:2][20] AS Email, contact_details[3:3][20] AS Contact_Number'), 
                'company_address', 
                'accountManager'
            )
            .where('accountName', accountName);
    }, 
    getAllContacts() {
        return knex('client')
            .select(
                knex.raw('contact_details[0:1][20] AS Customer_Name')
            );
    },
    getContact(accountName) {
        return knex('client')
            .select(
                knex.raw('contact_details[0:1][20] AS Customer_Name')
            )
            .where('accountName', accountName);
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