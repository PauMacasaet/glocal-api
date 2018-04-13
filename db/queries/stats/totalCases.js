const knex = require('../../knex'); // the connection

module.exports = {
    getAllStatus(query) {
        const knexQuery = knex('case_monitoring')
            .select('case_status')
            .count('* as NumberOfCases')
            .groupBy('case_status');
        if (query['case_status']) {
            knexQuery
                .whereIn(
                    'case_monitoring.case_status',
                    query['case_status']
                );
        }

        return knexQuery;
    }
}