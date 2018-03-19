const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('license');
    },
    getOne(on_site) {
        return knex.select('client', 'particulars', 'vendor', 'productName', 'quarterly_hc', 'remarks').from('license').where('on_site', on_site);
    }
}