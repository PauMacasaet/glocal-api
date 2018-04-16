const knex = require('../../knex'); // the connection

module.exports = {
    getMostCasesClient(query) {
        const knexQuery = knex('case_monitoring')
            .select('customer')
            .count('* as number_of_cases')
            .groupBy('customer')
            .orderBy('number_of_cases', 'desc')
            .first('customer');
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
    },
    getAllOpenCaseClient(query) {
        const knexQuery = knex('case_monitoring')
            .select('customer')
            .count('* as number_of_cases')
            .whereNot('case_status', 'Resolved')
            .groupBy('customer')
            .orderBy('number_of_cases', 'desc')
        if (query['customer']) {
            knexQuery
                .where(
                    'customer',
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
    },
    getAllResolvedCaseClient(query) {
        const knexQuery = knex('case_monitoring')
            .select('customer')
            .count('* as number_of_cases')
            .where('case_status', 'Resolved')
            .groupBy('customer')
            .orderBy('number_of_cases', 'desc');
        if (query['customer']) {
            knexQuery
                .where(
                    'customer',
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