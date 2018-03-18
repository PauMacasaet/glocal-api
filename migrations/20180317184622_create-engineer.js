
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('engineer', (table) => {
      table.increments('engId').primary().notNull();
      table.varchar('department', 50).notNull();
      table.varchar('firstName', 50).notNull();
      table.varchar('lastName', 50).notNull();
      table.boolean('isLead').notNull();
    }),

    knex.schema.createTable('vendor', (table) => {
      table.varchar('principal', 50).unique().primary().notNull();
    }), 

    knex.schema.createTable('client', (table) => {
      table.varchar('accountName', 50).unique().primary().notNull();
      table.specificType('contact_details', 'text[]').notNull();
      table.varchar('company_address', 100).notNull();
      table.varchar('accountManager', 50).notNull();
    }),

    knex.schema.createTable('products', (table) => {
      table.varchar('productName', 50).unique().primary().notNull();
      table.varchar('vendor', 50).references('principal').inTable('vendor').notNull().onUpdate('cascade');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('client'),
    knex.schema.dropTable('products'),
    knex.schema.dropTable('vendor'),
    knex.schema.dropTable('engineer')
  ]);
};
