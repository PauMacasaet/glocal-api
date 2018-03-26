const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('license');
    },
    getOne(on_site) {
        return knex
        .select('licenseId', 'client', 'particulars', 'vendor', 'productName', 'quarterly_hc', 'remarks', 'man_days', 'remaining_man_days')
        .from('license')
        .where('on_site', on_site);
    }
}