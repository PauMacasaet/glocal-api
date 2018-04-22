const knex = require('../../knex'); // the connection

module.exports = {
    getAllEngActivities(query) {
        const knexQuery = knex('activities')
            // .leftJoin(
            //     'activities',
            //     'activities.trackingNo',
            //     '=', 'case_monitoring.glocalId'
            // )
            .select(
                knex.raw(
                    `UNNEST(??::text[]) as assignedSystemsEngineer`, 
                    ['activities.assignedSystemsEngineer']
                )
            )
            .count('* as number_of_activities')
            .groupBy('activities.assignedSystemsEngineer')
            .orderBy('number_of_activities', 'desc');
        if (query['engineer']) {
            knexQuery
                .where(
                    'activities.assignedSystemsEngineer',
                    '@>',
                    query['engineer']
                );
        }
        if (query['customer']) {
            knexQuery
                .whereIn(
                    'case_monitoring.customer',
                    query['customer']
                )
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