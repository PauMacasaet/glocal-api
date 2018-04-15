const knex = require('../../knex'); // the connection
// isActive = Boolean
module.exports = {
    getAll(query) {
        const knexQuery = knex('license')
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
        .where('license.date_end', '>', new Date())
        .orderBy('license.date_end', 'asc');

        //SEARCH
        if (query.q) {
            knexQuery.where('license.client', 'ILIKE', `%${query.q}%`)
                .orWhere('license.vendor', 'ILIKE', `%${query.q}%`)
                .orWhere('license.productName', 'ILIKE', `%${query.q}%`)
                .orWhere('license.particulars', 'ILIKE', `%${query.q}%`)
                .orWhere('client.accountManager', 'ILIKE', `%${query.q}%`);
        }

        // SORT
        if (query.order_client) {
            knexQuery.orderBy('client', query.order_client);
        } else if (query.order_id ){
            knexQuery.orderBy('licenseId', query.order_id);
        } else if (query.order_vendor) {
            knexQuery.orderBy('vendor', query.order_vendor);
        } else if (query.order_product) {
            knexQuery.orderBy('productName', query.order_product);
        } else if (query.order_start) {
            knexQuery.orderBy('date_start', query.order_start);
        } else if (query.order_end) {
            knexQuery.orderBy('date_end', query.order_end);
        } else if (query.order_particulars) {
            knexQuery.orderBy('particulars', query.order_particulars);
        } else if (query.order_manager) {
            knexQuery.orderBy('accountManager', query.order_manager);
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
    getAllExpired(query) {
        const knexQuery = knex('license')
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
        .where('license.date_end', '<', new Date())
        .orderBy('license.date_end', 'asc');

        //SEARCH
        if (query.q) {
            const subquery = knexQuery.where('license.client', 'ILIKE', `%${query.q}%`)
                .orWhere('license.vendor', 'ILIKE', `%${query.q}%`)
                .orWhere('license.productName', 'ILIKE', `%${query.q}%`)
                .orWhere('license.particulars', 'ILIKE', `%${query.q}%`)
                .orWhere('client.accountManager', 'ILIKE', `%${query.q}%`);
            
            knexQuery
                .andWhere('license.licenseId', 'in', subquery);
        }

        // SORT
        if (query.order_client) {
            knexQuery.orderBy('client', query.order_client);
        } else if (query.order_id ){
            knexQuery.orderBy('licenseId', query.order_id);
        } else if (query.order_vendor) {
            knexQuery.orderBy('vendor', query.order_vendor);
        } else if (query.order_product) {
            knexQuery.orderBy('productName', query.order_product);
        } else if (query.order_start) {
            knexQuery.orderBy('date_start', query.order_start);
        } else if (query.order_end) {
            knexQuery.orderBy('date_end', query.order_end);
        } else if (query.order_particulars) {
            knexQuery.orderBy('particulars', query.order_particulars);
        } else if (query.order_manager) {
            knexQuery.orderBy('accountManager', query.order_manager);
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