const knex = require('../../knex'); // the connection

module.exports = {
    getAllStatus(query) {
        const knexQuery = knex('case_monitoring')
            .select(
                'case_status',
                'customer',
                'productName',
                'severity'
            )
            .count('* as number_of_cases')
            .groupBy('case_status', 'customer', 'productName', 'severity')
            .orderBy('number_of_cases', 'desc');
        if (query['case_status']) {
            knexQuery
                .whereIn(
                    'case_monitoring.case_status',
                    query['case_status']
                );
        }
        if (query['customer']) {
            knexQuery
                .whereIn(
                    'case_monitoring.customer',
                    query['customer']
                );
        }
        if (query['productName']) {
            knexQuery
                .whereIn(
                    'case_monitoring.productName',
                    query['productName']
                );
        }
        if (query['severity']) {
            knexQuery
                .whereIn(
                    'case_monitoring.severity',
                    query['severity']
                );
        }

        return knexQuery;
    }
}