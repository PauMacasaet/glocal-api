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
  create (user) {
    return knex('users')
      .insert(user, 'id')
      .then(ids => {
        return ids[0];
    });
  }
}
