
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
    }),

    knex.schema.createTable('license', (table) => {
      table.increments('licenseId');
      table.date('date_start').notNull();
      table.date('date_end').notNull();
      table.varchar('vendor', 50).references('principal').inTable('vendor').notNull().onUpdate('cascade');
      table.varchar('productName', 50).references('productName').inTable('products').notNull().onUpdate('cascade');
      table.varchar('client', 50).references('accountName').inTable('client').notNull().onUpdate('cascade');
      table.varchar('particulars', 200).notNull();
      table.varchar('on_site', 50);
      table.date('support_date_start').notNull();
      table.date('support_date_end').notNull();
      table.integer('man_days').notNull();
      table.integer('remaining_man_days').notNull();
      table.boolean('quarterly_hc').notNull();
      table.varchar('remarks', 200);
    }),

    knex.schema.createTable('contact_person', (table) => {
      table.varchar('client', 50).references('accountName').inTable('client').notNull().onUpdate('cascade');
      table.varchar('personName', 50).unique().notNull();
    }),

    knex.schema.createTable('case_monitoring', (table) => {
      table.increments('glocalId').primary().notNull();
      table.varchar('vendorCaseId', 50);
      table.date('dateIdCreated').notNull();
      table.date('dateRaised').notNull();
      table.varchar('caseTitle', 50).notNull();
      table.varchar('caseDescription', 100).notNull();
      table.integer('severity').notNull();
      table.varchar('vendor', 50).notNull();
      table.varchar('customer', 50).references('accountName').inTable('client').notNull().onUpdate('cascade');
      table.varchar('productName', 50).references('productName').inTable('products').notNull().onUpdate('cascade');
      table.varchar('systemsEngineerLead', 50);
      table.varchar('assignedAccountManager', 50);
      table.varchar('leads', 50).notNull();
      table.varchar('case_status', 50).notNull();
    }),

    knex.schema.createTable('activities', (table) => {
      table.integer('trackingNo').references('glocalId').inTable('case_monitoring').notNull().onUpdate('cascade');
      table.increments('activityNo');
      table.timestamp('timeIn').notNull();
      table.timestamp('timeOuts').notNull();
      table.varchar('productName', 50).references('productName').inTable('products').notNull().onUpdate('cascade');
      table.varchar('client', 50).notNull();
      table.varchar('contactCustomer', 50).references('personName').inTable('contact_person').notNull();
      table.varchar('addres', 50).notNull();
      table.varchar('typeOfActivity', 50).notNull();
      table.varchar('purposeOfVisit', 50).notNull();
      table.varchar('activityPerformed', 250).notNull();
      table.varchar('nextActivity', 250).notNull();
      table.varchar('recommendations');
      table.integer('engid').references('engId').inTable('engineer').notNull();
      table.varchar('engineerName', 50);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('activities'),
    knex.schema.dropTable('case_monitoring'),
    knex.schema.dropTable('contact_person'),
    knex.schema.dropTable('license'),
    knex.schema.dropTable('client'),
    knex.schema.dropTable('products'),
    knex.schema.dropTable('vendor'),
    knex.schema.dropTable('engineer')
  ]);
};
