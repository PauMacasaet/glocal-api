const vendors = require('../inserts/vendors');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vendor').del()
    .then(function () {
      // Inserts seed entries
      return knex('vendor').insert(vendors);
    });
};
