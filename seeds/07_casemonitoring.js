const cases = require('../cases');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('case_monitoring').del()
    .then(function () {
      // Inserts seed entries
      return knex('case_monitoring').insert(cases);
    });
};
