const clients = require('../inserts/clients');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('client').del()
    .then(function () {
      // Inserts seed entries
      return knex('client').insert(clients);
    });
};
