const knex = require('../../knex'); // the connection

module.exports = {
    getAllVendorCases (query) {
        const knexQuery = knex('case_monitoring')
            .select(
                'vendor'
            )
            .count('* as number_of_vendor_cases')
            .groupBy('vendor');

        if (query['vendor']) {
            knexQuery
                .whereIn(
                    'case_monitoring.vendor',
                    query['vendor']
                );
        }
        if (query.from && query.to) { //cases and reports
            knexQuery
                .whereBetween(
                    'case_monitoring.dateRaised',
                    [
                        query.from,
                        query.to
                    ]
                );
        }

        return knexQuery;
    }
}