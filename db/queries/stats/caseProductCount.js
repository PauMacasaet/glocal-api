const knex = require('../../knex'); // the connection

module.exports = {
    getAllCaseProduct(query) {
        const knexQuery = knex('case_monitoring')
            .select('productName')
            .count('* as number_of_cases')
            .groupBy('productName')
            .orderBy('number_of_cases', 'desc');
        if (query['productName']) {
            knexQuery
                .where(
                    'case_monitoring.productName',
                    query['productName']
                );
        }
        return knexQuery;
    }
}