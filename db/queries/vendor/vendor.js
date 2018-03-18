const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('vendor');
    },
    getOne(principal) {
        return knex('vendor').where('principal', principal);
    },
    create(vendor) {
        return knex('vendor').insert(vendor, '*');
    },
    update(principal, vendor) {
        return knex('vendor').where('principal', principal).update(vendor);
    }, 
    delete(principal) {
        return knex('vendor').where('principal', principal).del();
    }
}