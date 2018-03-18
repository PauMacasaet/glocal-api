const licenses = require('../licenses');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('license').del()
    .then(function () {
      // Inserts seed entries
      return knex('license').insert(licenses);
    });
};
