const knex = require('../../knex'); // the connection

module.exports = {
    getOne(productName) {
        return knex('license')
        .join('client', 'client.accountName', '=', 'license.client')
        .select('license.licenseId', 'license.client', 'license.vendor', 'license.productName', 'license.date_start', 'license.date_end', 'license.particulars', 'client.accountManager AS assignedAM', 'license.man_days', 'license.remaining_man_days')
        .where('license.productName', productName);
    }
}