const knex = require('../../knex'); // the connection

module.exports = {
    getAllSeverity(query) {
        const knexQuery = knex('case_monitoring')
            .select('severity')
            .count('* as number_of_cases_severity')
            .groupBy('severity');

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