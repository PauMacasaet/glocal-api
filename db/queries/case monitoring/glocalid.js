const knex = require('../../knex'); // the connection

module.exports = {
    getAll(query) {
        const knexQuery = knex('case_monitoring')
            .join(
                'client', 
                'client.accountName', 
                '=', 'case_monitoring.customer'
            )
            .leftJoin(
                'activities', 
                'activities.trackingNo', 
                '=', 'case_monitoring.glocalId'
            )
            .select( 
                'case_monitoring.glocalId',
                'activities.assignedSystemsEngineer',
                'case_monitoring.vendorCaseId', 
                'case_monitoring.dateIdCreated', 
                'client.accountManager', 
                'case_monitoring.case_status', 
                'case_monitoring.caseDescription', 
                'case_monitoring.caseTitle', 
                'case_monitoring.customer', 
                'case_monitoring.dateRaised', 
                'case_monitoring.productName', 
                'case_monitoring.severity', 
                'case_monitoring.systemsEngineerLead', 
                'case_monitoring.vendor', 
                'activities.typeOfActivity AS Activity',
                'activities.purposeOfVisit',
                'activities.timeOuts AS date_last_updated',
                'case_monitoring.date_resolved'
            )
            .orderBy('case_monitoring.glocalId', 'desc');
        
        // SEARCH AND FILTER
        if (query.q) {
            knexQuery
                .where(
                    'case_monitoring.customer', 
                    'ILIKE', 
                    `%${query.q}%`
                )
                .orWhere(
                    'case_monitoring.caseTitle',
                     'ILIKE', 
                     `%${query.q}%`
                )
                .orWhere(
                    'case_monitoring.caseDescription', 
                    'ILIKE', 
                    `%${query.q}%`
                )
                .orWhere(
                    'case_monitoring.productName', 
                    'ILIKE', 
                    `%${query.q}%`
                );
        }
        if (query['customer']) {
            knexQuery
                .whereIn(
                    'case_monitoring.customer', 
                    query['customer']
                );
        }
        if (query['case_status']) {
            knexQuery
                .whereIn(
                    'case_monitoring.case_status', 
                    query['case_status']
                );
        }
        if (query['assignedSystemsEngineer']) {
            knexQuery
                .where(
                    'activities.assignedSystemsEngineer'.toString(),
                    '@>',
                    query['assignedSystemsEngineer']
                );
        }
        if (query['systemsEngineerLead']) {
            knexQuery
                .whereIn(
                    'case_monitoring.systemsEngineerLead',
                    query['systemsEngineerLead']
                );
        }
        if (query['severity']) {
            knexQuery
                .whereIn(
                    'case_monitoring.severity', 
                    query['severity']
                );
        }
        if (query['vendor']) {
            knexQuery
                .whereIn(
                    'case_monitoring.vendor',
                     query['vendor']
                    );
        }
        if (query['productName']) {
            knexQuery
                .whereIn(
                    'case_monitoring.productName', 
                    query['productName']
                );
        }
        if (query['dateRaised']) {
            knexQuery
                .whereIn(
                    'case_monitoring.dateRaised', 
                    query['dateRaised']);
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

        // SORT
        if (query.order_id) {
            knexQuery
                .orderBy(
                    'case_monitoring.glocalId', 
                    query.order_id
                );
        } else if (query.order_customer) {
            knexQuery
                .orderBy(
                    'case_monitoring.customer', 
                    query.order_customer
                );
        } else if (query.order_status) {
            knexQuery
                .orderBy(
                    'case_monitoring.case_status', 
                    query.order_status
                );
        } else if (query.order_se) {
            knexQuery
                .orderBy(
                    'activities.assignedSystemsEngineer', 
                    query.order_se
                );
        } else if (query.order_severity) {
            knexQuery
                .orderBy(
                    'case_monitoring.severity', 
                    query.order_severity
                );
        } else if (query.order_title) {
            knexQuery
                .orderBy(
                    'case_monitoring.case_title', 
                    query.order_title
                );
        } else if (query.order_product) {
            knexQuery
                .orderBy(
                    'case_monitoring.productName', 
                    query.order_product
                );
        } else if (query.order_update) {
            knexQuery
                .orderBy(
                    'activities.timeOuts', 
                    query.order_update
                );
        } else if (query.order_raised) {
            knexQuery
                .orderBy(
                    'case_monitoring.dateRaised', 
                    query.order_raised
                );
        }

        // PAGINATION

        if (query.limit) {
            knexQuery.limit(query.limit);
            if (query.offset) {
                knexQuery.offset(query.offset);
            }
        }
        
        return knexQuery;
    },
    getUserSE (query) {
        const knexQuery = knex('case_monitoring')
        .join(
            'client', 
            'client.accountName', 
            '=', 'case_monitoring.customer'
        )
        .leftJoin(
            'activities', 
            'activities.trackingNo', 
            '=', 'case_monitoring.glocalId'
        )
        .select( 
            'case_monitoring.glocalId',
            'activities.assignedSystemsEngineer',
            'case_monitoring.vendorCaseId', 
            'case_monitoring.dateIdCreated', 
            'client.accountManager', 
            'case_monitoring.case_status', 
            'case_monitoring.caseDescription', 
            'case_monitoring.caseTitle', 
            'case_monitoring.customer', 
            'case_monitoring.dateRaised', 
            'case_monitoring.productName', 
            'case_monitoring.severity', 
            'case_monitoring.systemsEngineerLead', 
            'case_monitoring.vendor', 
            'activities.timeOuts AS date_last_updated',
            'case_monitoring.date_resolved'
        )
        .where('activities.assignedSystemsEngineer', '@>', query.user)
        //.where('case_monitoring.systemsEngineerLead', query.SELead)
        .orderBy('case_monitoring.glocalId', 'desc');
        
        // FILTER
        
        if (query['customer']) {
            knexQuery
                .whereIn(
                    'case_monitoring.customer', 
                    query['customer']
                );
        }
        if (query['case_status']) {
            knexQuery
                .whereIn(
                    'case_monitoring.case_status', 
                    query['case_status']
                );
        }
        if (query['systemsEngineerLead']) {
            knexQuery
                .whereIn(
                    'case_monitoring.systemsEngineerLead',
                    query['systemsEngineerLead']
                );
        }
        if (query['severity']) {
            knexQuery
                .whereIn(
                    'case_monitoring.severity', 
                    query['severity']
                );
        }
        if (query['vendor']) {
            knexQuery
                .whereIn(
                    'case_monitoring.vendor',
                     query['vendor']
                    );
        }
        if (query['productName']) {
            knexQuery
                .whereIn(
                    'case_monitoring.productName', 
                    query['productName']
                );
        }
        if (query.dateRaised) {
            knexQuery
                .whereIn(
                    'case_monitoring.dateRaised', 
                    query.dateRaised);
        }

        // SORT
        if (query.order_id) {
            knexQuery
                .orderBy(
                    'case_monitoring.glocalId', 
                    query.order_id
                );
        } else if (query.order_customer) {
            knexQuery
                .orderBy(
                    'case_monitoring.customer', 
                    query.order_customer
                );
        } else if (query.order_status) {
            knexQuery
                .orderBy(
                    'case_monitoring.case_status', 
                    query.order_status
                );
        } else if (query.order_severity) {
            knexQuery
                .orderBy(
                    'case_monitoring.severity', 
                    query.order_severity
                );
        } else if (query.order_title) {
            knexQuery
                .orderBy(
                    'case_monitoring.case_title', 
                    query.order_title
                );
        } else if (query.order_product) {
            knexQuery
                .orderBy(
                    'case_monitoring.productName', 
                    query.order_product
                );
        } else if (query.order_update) {
            knexQuery
                .orderBy(
                    'activities.timeOuts', 
                    query.order_update
                );
        } else if (query.order_raised) {
            knexQuery
                .orderBy(
                    'case_monitoring.dateRaised', 
                    query.order_raised
                );
        }

        // PAGINATION

        if (query.limit) {
            knexQuery.limit(query.limit);
            if (query.offset) {
                knexQuery.offset(query.offset);
            }
        }
        
        return knexQuery;
    },
    getOne(glocalId) {
        return knex('case_monitoring')
        .join('client', 'client.accountName', '=', 'case_monitoring.customer')
        .leftJoin('activities', 'activities.trackingNo', '=', 'case_monitoring.glocalId')
        .distinct('case_monitoring.glocalId')
        .select(
            'case_monitoring.glocalId',
            'activities.assignedSystemsEngineer', 
            'case_monitoring.vendorCaseId', 
            'case_monitoring.dateIdCreated', 
            'client.accountManager', 
            'case_monitoring.case_status', 
            'case_monitoring.caseDescription', 
            'case_monitoring.caseTitle', 
            'case_monitoring.customer', 
            'case_monitoring.dateRaised', 
            'case_monitoring.productName', 
            'case_monitoring.severity', 
            'case_monitoring.systemsEngineerLead', 
            'case_monitoring.vendor', 
            'activities.timeOuts AS date_last_updated',
            'case_monitoring.date_resolved'
        )
        //.groupBy('case_monitoring.glocalId', 'activities.assignedSystemsEngineer', 'client.accountManager')
        .where('glocalId', glocalId);
    },
    create(case_mon) {
        return knex('case_monitoring')
            .insert(case_mon, '*');
    },
    update(glocalId, case_monitoring) {
        const knexQuery = knex('case_monitoring')
            .where('glocalId', glocalId)
            .update(case_monitoring, '*');
        return knexQuery;
    }, 
    delete(glocalId) {
        return knex('case_monitoring')
            .where('glocalId', glocalId).del();
    }
}