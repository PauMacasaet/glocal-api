const knex = require('../../knex'); // the connection

module.exports = {
    getOne(licenseID) {
        return knex('license').join('client', 'client.accountName', '=', 'license.client').select('license.client', 'license.vendor', 'license.productName', 'license.date_start', 'license.date_end', 'license.particulars', 'client.accountManager AS assignedAM').where('license.licenseId', licenseID);
    }
}