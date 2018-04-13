const knex = require('../../knex'); // the connection

module.exports = {
    getAllEngActivities(query) {
        const knexQuery = knex('activities')
            .select('assignedSystemsEngineer')
            .count('* as number_of_activities')
            .groupBy('assignedSystemsEngineer')
            .orderBy('number_of_activities', 'desc');
        if (query['engineer']) {
            knexQuery
                .where(
                    'activities.assignedSystemsEngineer',
                    '@>', 
                    query['engineer']
                );
        }
        return knexQuery;
    }
}