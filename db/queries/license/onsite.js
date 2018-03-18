const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('license');
    },
    getOne(on_site) {
        return knex.select('client', 'date_start', 'date_end', 'support_date_start', 'support_date_end', 'particulars', 'on_site').from('license').where('on_site', on_site);
    },
}