const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('license');
    },
    getOne(productName) {
        return knex.select('client', 'date_start', 'date_end', 'support_date_start', 'support_date_end', 'particulars', 'on_site').from('license').where('productName', productName);
    },
    create(license) {
        return knex('license').insert(license, '*');
    },
    update(productName, license) {
        return knex('license').where('productName', productName).update(license);
    }, 
    delete(productName) {
        return knex('license').where('productName', productName).del();
    }
}