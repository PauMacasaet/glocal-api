const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('products');
    },
    getOne(vendor) {
        return knex('products').where('vendor', vendor);
    }
}