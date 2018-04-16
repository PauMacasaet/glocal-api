const knex = require('../../knex'); // the connection

module.exports = {
    getAllCaseProduct(query) { // product utilization
        const knexQuery = knex('case_monitoring')
            .select('productName')
            .count('* as number_of_cases')
            .groupBy('productName')
            .where('case_status', 'Resolved')
            .orderBy('number_of_cases', 'desc');
        if (query['productName']) {
            knexQuery
                .where(
                    'case_monitoring.productName',
                    query['productName']
                );
        }
        if(query['customer']) {
            knexQuery
                .where(
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
    },
    getAllOpenProduct(query) { // open case products
        const knexQuery = knex('case_monitoring')
            .select('productName')
            .count('* as number_of_opencase_products')
            .whereNot('case_status', 'Resolved')
            .groupBy('productName')
            .orderBy('number_of_opencase_products', 'desc')
            .first('productName');
    
        if (query['productName']) {
            knexQuery
                .where(
                    'case_monitoring.productName',
                    query['productName']
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