const knex = require('../../knex'); // the connection

module.exports = {
    getAllCaseClient(query) {
        const knexQuery = knex('case_monitoring')
            .select('customer')
            .count('* as number_of_cases')
            .groupBy('customer')
            .orderBy('number_of_cases', 'desc');
        if (query['customer']) {
            knexQuery
                .where(
                    'case_monitoring.customer',
                    query['customer']
                );
        }
        return knexQuery;
    }
}