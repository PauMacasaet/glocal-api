const contacts = require('../inserts/contacts');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contact_person').del()
    .then(function () {
      // Inserts seed entries
      return knex('contact_person').insert(contacts);
    });
};
