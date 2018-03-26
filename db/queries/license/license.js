const knex = require('../../knex'); // the connection
// isActive = Boolean
module.exports = {
    getAll() {
        return knex('license')
        .join('client', 'client.accountName', '=', 'license.client')
        .select('license.licenseId', 'license.client', 'license.vendor', 'license.productName', 'license.date_start', 'license.date_end', 'license.particulars', 'client.accountManager AS assignedAM', 'license.man_days', 'license.remaining_man_days')
        .orderBy('license.licenseId', 'asc');
    },
    getOne(licenseId) {
        return knex('license')
        .join('client', 'client.accountName', '=', 'license.client')
        .select('license.licenseId', 'license.client', 'license.vendor', 'license.productName', 'license.date_start', 'license.date_end', 'license.particulars', 'client.accountManager AS assignedAM', 'license.man_days', 'license.remaining_man_days')
        .where('license.licenseId', licenseId)
        .first();
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