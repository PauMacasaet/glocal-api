const knex = require('../../knex'); // the connection
// isActive = Boolean
module.exports = {
    getAll() {
        return knex('license')
        .join('client', 'client.accountName', '=', 'license.client')
        .select('license.licenseId', 'license.client', 'license.vendor', 'license.productName', 'license.date_start', 'license.date_end', 'license.particulars', 'client.accountManager AS assignedAM')
        .orderBy('license.licenseId', 'asc');
    },
    getOne(productName) {
        return knex.select('licenseId', 'client', 'date_start', 'date_end', 'support_date_start', 'support_date_end', 'particulars', 'on_site').from('license').where('productName', productName);
    },
    create(license) {
        return knex('license').insert(license, '*');
    },
    update(licenseId, license) {
        return knex('license').where('licenseId', licenseId).update(license);
    }, 
    delete(license) {
        return knex('license').where('licenseId', licenseId).del();
    }
}