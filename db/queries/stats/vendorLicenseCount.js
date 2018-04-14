const knex = require('../../knex'); // the connection

module.exports = {
    getAllVendorLicense (query) {
        const knexQuery = knex('license')
            .select(
                'vendor'
            )
            .count('* as number_of_vendor_license')
            .groupBy('vendor');

        if (query['vendor']) {
            knexQuery
                .whereIn(
                    'license.vendor',
                    query['vendor']
                );
        }

        return knexQuery;
    }
}