const knex = require('../../knex');

module.exports = {
  getAll () {
    return knex('user');
  },
  getOne (id) {
    return knex('user')
      .where('userid', id)
      .first();
  },
  getOneByName(name) {
    return knex('user')
      .where('fullName', name);
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
      .insert(user, 'userid')
      .then(ids => {
        return ids[0];
    });
  },
  update(userid, user) {
    return knex('user')
      .where('userid', userid)
      .update(user);
  }
}
