const knex = require('../../knex'); // the connection

module.exports = {
    getSeverity(query) {
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
                'case_monitoring.severity',
                'case_monitoring.glocalId',
                'case_monitoring.customer AS Company',
                'case_monitoring.case_status AS Status',
                'activities.typeOfActivity AS Activity',
                'activities.purposeOfVisit',
                'activities.timeOuts AS date_last_updated'
            )
            .where('case_monitoring.severity', query.severity)
            .whereNot('case_monitoring.case_status', 'Resolved');

            // SORT
            if (query.order_id) {
                knexQuery.orderBy('case_monitoring.glocalId', query.order_id);
            } else if (query.order_customer) {
                knexQuery.orderBy('case_monitoring.customer', query.order_customer);
            } else if (query.order_status) {
                knexQuery.orderBy('case_monitoring.case_status', query.order_status);
            } else if (query.order_type) {
                knexQuery.orderBy('activities.typeOfActivity', query.order_type);
            } else if (query.order_purpose) {
                knexQuery.orderBy('activities.purposeOfVisit', query.order_purpose);
            } else if (query.order_update) {
                knexQuery.orderBy('activities.timeOuts', query.order_update);
            } 
    
            // PAGINATION
    
            if (query.limit) {
                knexQuery.limit(query.limit);
                if (query.offset) {
                    knexQuery.offset(query.offset);
                }
            }
            
            return knexQuery;
    }
}