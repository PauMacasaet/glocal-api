const knex = require('../../knex'); // the connection

module.exports = {
    getAllSeverity(query) {
        const knexQuery = knex('case_monitoring')
            .select(
                'case_status',
                'customer',
                'severity'
            )
            .count('* as number_of_cases_severity')
            .whereNot('case_status', 'Resolved')
            .groupBy('case_status', 'customer', 'severity')
            .orderBy('number_of_cases_severity', 'desc');

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
        
        if (query['severity']) {
            knexQuery
                .whereIn(
                    'case_monitoring.severity',
                    query['severity']
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