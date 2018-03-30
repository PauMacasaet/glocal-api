const knex = require('../../knex'); // the connection
// isActive = Boolean
module.exports = {
    getAll() {
        return knex('license')
        .join(
            'client', 
            'client.accountName', 
            '=', 'license.client'
        )
        .select(
            'license.licenseId', 
            'license.client', 
            'license.vendor', 
            'license.productName', 
            'license.date_start', 
            'license.date_end', 
            'license.particulars', 
            'client.accountManager AS assignedAM', 
            'license.man_days', 
            'license.remaining_man_days',
            'license.on_site',
            'license.support_date_start',
            'license.support_date_end',
            'license.quarterly_hc',
            'license.remarks'
        )
        .orderBy('license.licenseId', 'asc');
    },
    sortLicense(query) {
        const knexQuery = knex('license')
            .leftJoin(
                'client', 
                'client.accountName', 
                '=', 'license.client'
            )
            .select(
                'license.licenseId', 
                'license.client', 
                'license.vendor', 
                'license.productName', 
                'license.date_start', 
                'license.date_end', 
                'license.particulars', 
                'client.accountManager AS assignedAM', 
                'license.man_days', 
                'license.remaining_man_days',
                'license.on_site',
                'license.support_date_start',
                'license.support_date_end',
                'license.quarterly_hc',
                'license.remarks'
            );

        if (query.client) {
            knexQuery.orderBy('license.client', query.client);
        } else if (query.licenseId ){
            knexQuery.orderBy('license.licenseId', query.licenseId);
        } else if (query.vendor) {
            knexQuery.orderBy('license.vendor', query.vendor);
        } else if (query.productName) {
            knexQuery.orderBy('license.productName', query.productName);
        } else if (query.date_start) {
            knexQuery.orderBy('license.date_start', query.date_start);
        } else if (query.date_end) {
            knexQuery.orderBy('license.date_end', query.date_end);
        } else if (query.particulars) {
            knexQuery.orderBy('license.particulars', query.particulars);
        } else if (query.accountManager) {
            knexQuery.orderBy('client.accountManager', query.accountManager);
        }

        return knexQuery;
    },
    getOne(licenseId) {
        return knex('license')
        .join('client', 'client.accountName', '=', 'license.client')
        .select(
            'license.licenseId', 
            'license.client', 
            'license.vendor', 
            'license.productName', 
            'license.date_start', 
            'license.date_end', 
            'license.particulars', 
            'client.accountManager AS assignedAM', 
            'license.man_days', 
            'license.remaining_man_days',
            'license.on_site',
            'license.support_date_start',
            'license.support_date_end',
            'license.quarterly_hc',
            'license.remarks'
        )
        .where('license.licenseId', licenseId)
        .first();
    },
    create(license) {
        return knex('license').insert(license, '*');
    },
    update(licenseId, license) {
        return knex('license').where('licenseId', licenseId).update(license, '*');
    }, 
    delete(license) {
        return knex('license').where('licenseId', licenseId).del();
    }
}