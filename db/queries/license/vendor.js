const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('license');
    },
    getOne(client) {
        return knex
        .select('licenseId', 'productName', 'date_start', 'date_end', 'support_date_start', 'support_date_end', 'particulars', 'on_site')
        .from('license')
        .where('client', client);
    },
}