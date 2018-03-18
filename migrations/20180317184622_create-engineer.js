
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('engineer', (table) => {
      table.increments('engId').primary().notNull();
      table.varchar('department', 50).notNull();
      table.varchar('firstName', 50).notNull();
      table.varchar('lastName', 50).notNull();
      table.boolean('isLead').notNull();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('engineer')
  ]);
};
