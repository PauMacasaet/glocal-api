const knex = require('../../knex');

module.exports = {
  getAll () {
    return knex('users');
  },
  getOne (id) {
    return knex('users')
      .where('id', id)
      .first();
  },
  getOneByContact (contactNumber) {
    return knex('users')
      .where('contactNumber', contactNumber);
  },
  getOneByEmail (email) {
    return knex('users')
      .where('email', email)
      .first();
  },
  create (users) {
    return knex('users')
      .insert(users, 'id')
      .then(ids => {
        return ids[0];
    });
  }
}
