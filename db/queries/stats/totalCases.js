const knex = require('../../knex'); // the connection

module.exports = {
    getAllStatus(query) {
        const knexQuery = knex('case_monitoring')
            .select(
                'case_status',
            )
            .count('* as number_of_cases')
            .groupBy('case_status')
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