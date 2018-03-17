
exports.up = function(knex, Promise) {
  return knex.schema.createTable('engineer', (table) => {
      table.increments('engId').primary().notNull();
      table.varchar('department', 50).notNull();
      table.varchar('firstName', 50).notNull();
      table.varchar('lastName', 50).notNull();
      table.boolean('isLead').notNull();
  }); // child tables follow before semicolon
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('engineer');
};
