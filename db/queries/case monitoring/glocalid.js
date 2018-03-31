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
            'activities.timeOuts AS date_last_updated',
        );
        if (query.q) {
            knexQuery.where('case_monitoring.customer', 'like', `%${query.q}%`)
                .orWhere('case_monitoring.caseTitle', 'like', `%${query.q}%`)
                .orWhere('case_monitoring.caseDescription', 'like', `%${query.q}%`)
                .orWhere('case_monitoring.productName', 'like', `%${query.q}%`);
        }
        if (query.customer) {
            knexQuery.where('case_monitoring.customer', query.customer);
        }
        if (query.case_status) {
            knexQuery.where('case_monitoring.case_status', query.case_status);
        }
        if (query.assignedSystemsEngineer) {
            knexQuery.where('activities.assignedSystemsEngineer', '@>', query.assignedSystemsEngineer);
        }
        if (query.severity) {
            knexQuery.where('case_monitoring.severity', query.severity);
        }
        if (query.vendor) {
            knexQuery.where('case_monitoring.vendor', query.vendor);
        }
        if (query.productName) {
            knexQuery.where('case_monitoring.productName', query.productName);
        }
        if (query.dateRaised) {
            knexQuery.where('case_monitoring.dateRaised', query.dateRaised);
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
            'activities.timeOuts AS date_last_updated'
        )
        //.groupBy('case_monitoring.glocalId', 'activities.assignedSystemsEngineer', 'client.accountManager')
        .where('glocalId', glocalId);
    },
    sortCase(query) {
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
            );

        if (query.glocalId) {
            knexQuery.orderBy('case_monitoring.glocalId', query.glocalId);
        } else if (query.customer) {
            knexQuery.orderBy('case_monitoring.customer', query.customer);
        } else if (query.case_status) {
            knexQuery.orderBy('case_monitoring.case_status', query.case_status);
        } else if (query.assignedSystemsEngineer) {
            knexQuery.orderBy('activities.assignedSystemsEngineer', query.assignedSystemsEngineer);
        } else if (query.severity) {
            knexQuery.orderBy('case_monitoring.severity', query.severity);
        } else if (query.caseTitle) {
            knexQuery.orderBy('case_monitoring.caseTitle', query.caseTitle);
        } else if (query.productName) {
            knexQuery.orderBy('case_monitoring.productName', query.productName);
        } else if (query.timeOuts) {
            knexQuery.orderBy('activities.timeOuts', query.timeOuts);
        } else if (query.dateRaised) {
            knexQuery.orderBy('case_monitoring.dateRaised', query.dateRaised);
        }

        return knexQuery;
    },
    create(case_mon) {
        return knex('case_monitoring').insert(case_mon, '*');
    },
    update(glocalId, case_monitoring) {
        return knex('case_monitoring').where('glocalId', glocalId).update(case_monitoring, '*');
    }, 
    delete(glocalId) {
        return knex('case_monitoring').where('glocalId', glocalId).del();
    }
}