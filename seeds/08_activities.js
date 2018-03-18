const activities = require('../activities');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('activities').del()
    .then(function () {
      // Inserts seed entries
      return knex('activities').insert(activities);
    });
};
