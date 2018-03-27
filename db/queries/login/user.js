const knex = require('../../knex');

module.exports = {
  getAll () {
    return knex('user');
  },
  getOne (id) {
    return knex('user')
      .where('id', id)
      .first();
  },
  getOneByContact (contactNumber) {
    return knex('user')
      .where('contactNumber', contactNumber);
  },
  getOneByEmail (email) {
    return knex('user')
      .where('email', email)
      .first();
  },
  create (user) {
    return knex('user')
      .insert(user, 'id')
      .then(ids => {
        return ids[0];
    });
  }
}
