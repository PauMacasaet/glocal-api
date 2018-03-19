const engineers = require('../inserts/engineers');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('engineer').del()
    .then(function () {
      // Inserts seed entries
      return knex('engineer').insert(engineers);
    });
};
