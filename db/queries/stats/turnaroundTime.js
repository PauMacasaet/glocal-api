const knex = require('../../knex');

module.exports = {
    getTurnaroundAvg(query) {
        const knexQuery = knex('case_monitoring')
            .avg(
                knex.raw(
                    `DATE_PART('day', ?? - ??)`,
                    ['date_resolved', 'dateRaised']
                )
            );
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
                    'dateRaised',
                    [
                        query.from,
                        query.to
                    ]
                );
        }
        return knexQuery;
    }
}