const reports = require('../inserts/reports');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('service_reports').del()
    .then(function () {
      // Inserts seed entries
      return knex('service_reports').insert(reports);
    });
};
