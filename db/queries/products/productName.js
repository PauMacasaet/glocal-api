const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('products');
    },
    getOne(productName) {
        return knex('products').where('productName', productName);
    },
    create(product) {
        return knex('products').insert(product, '*');
    },
    update(productName, product) {
        return knex('products').where('productName', productName).update(product, '*');
    }, 
    delete(productName) {
        return knex('products').where('productName', productName).del();
    }
}