
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user', (table) => {
      table.increments('userid').primary()
        .index('index_userid', 'btree');
      table.varchar('fullName', 50).unique()
        .index('index_full', 'hash').notNull();
      table.varchar('username', 50).unique()
        .index('index_username', 'hash').notNull();
      table.varchar('email', 50).unique()
        .index('index_email', 'hash').notNull();
      table.text('password').notNull();
      table.varchar('contactNumber', 50)
        .index('index_contactno', 'hash').notNull();
      table.datetime('dateCreated')
        .index('index_created', 'hash').notNull();
      table.enu('position', 
        [
        'Managing Director', 
        'Sales Director',
        'Sales Manager', 
        'Senior Sales Consultant',
        'Sales Consultant',
        'Senior Account Manager',
        'Technical Manager',
        'Senior Systems Engineer', 
        'Systems Engineer',
        'Business Development Manager', 
        'Account Manager',
        'Product Specialist',
        'Corporate Affairs Director',
        'Project Manager',
        'Team Lead'
      ]
      )
        .index('index_position', 'hash').notNull();
      table.boolean('is_active').defaultTo(true)
        .index('index_active', 'hash').notNull();
    }),

    knex.schema.createTable('vendor', (table) => {
      table.varchar('principal', 50).unique().primary()
        .index('index_principal', 'hash').notNull();
    }), 

    knex.schema.createTable('client', (table) => {
      table.varchar('accountName', 400).unique().primary()
        .index('index_accountname', 'hash').notNull();
      table.specificType('contact_details', 'text[]')
        .index('index_contactdetails', 'hash').notNull();
      table.varchar('company_address', 400)
        .index('index_address', 'hash').notNull();
      table.varchar('accountManager', 50).references('fullName').inTable('user')
        .index('index_manager', 'hash').notNull().onUpdate('cascade');
    }),

    knex.schema.createTable('products', (table) => {
      table.varchar('productName', 300).unique().primary()
        .index('index_productname', 'hash').notNull();
      table.varchar('vendor', 200).references('principal').inTable('vendor')
        .index('index_vendor', 'hash').notNull().onUpdate('cascade');
    }),

    knex.schema.createTable('license', (table) => {
      table.increments('licenseId').index('index_licenseid', 'btree');
      table.date('date_start')
        .index('index_datestart', 'hash').notNull();
      table.date('date_end')
        .index('index_dateend', 'hash').notNull();
      table.varchar('vendor', 200).references('principal').inTable('vendor')
        .index('index_licensevendor', 'hash').notNull().onUpdate('cascade');
      table.varchar('productName', 300).references('productName').inTable('products')
        .index('index_licenseproduct', 'hash').notNull().onUpdate('cascade');
      table.varchar('client', 400).references('accountName').inTable('client')
        .index('index_licenseclient', 'hash').notNull().onUpdate('cascade');
      table.varchar('particulars', 400)
        .index('index_particulars', 'hash').notNull();
      table.varchar('on_site', 50).index('index_onsite', 'hash');
      table.date('support_date_start')
        .index('index_supportstart', 'hash').notNull();
      table.date('support_date_end')
        .index('index_supportend', 'hash').notNull();
      table.integer('man_days')
        .index('index_mandays', 'btree').notNull();
      table.integer('remaining_man_days')
        .index('index_remmandays', 'btree').notNull();
      table.boolean('quarterly_hc')
        .index('index_hc', 'hash').notNull();
      table.varchar('remarks', 2000).index('index_remarks', 'hash');
    }),

    knex.schema.createTable('case_monitoring', (table) => {
      table.increments('glocalId').primary()
        .index('index_glocalid', 'btree').notNull();
      table.varchar('vendorCaseId', 50)
        .index('index_vendorid', 'hash');
      table.date('dateIdCreated')
        .index('index_casecreate', 'hash').notNull();
      table.date('dateRaised')
        .index('index_dateraised', 'hash').notNull();
      table.varchar('caseTitle', 100)
        .index('index_casetile', 'hash').notNull();
      table.varchar('caseDescription', 300)
        .index('index_desc', 'hash').notNull();
      table.integer('severity')
        .index('index_severity', 'btree').notNull();
      table.varchar('vendor', 200).references('principal').inTable('vendor')
        .index('index_casevendor', 'hash').notNull().onUpdate('cascade');
      table.varchar('customer', 400).references('accountName').inTable('client')
        .index('index_casecus', 'hash').notNull().onUpdate('cascade');
      table.varchar('productName', 300).references('productName').inTable('products')
        .index('index_caseprod', 'hash').notNull().onUpdate('cascade');
      table.varchar('contact_person', 50)
        .index('index_case_contact', 'hash').notNull();
      table.varchar('systemsEngineerLead', 50).references('fullName').inTable('user')
        .index('index_lead', 'hash').onUpdate('cascade');
      table.varchar('case_status', 50)
        .index('index_status', 'hash').notNull();
      table.datetime('date_resolved')
        .index('index_resolved', 'hash');
    }),

    knex.schema.createTable('service_reports', (table) => {
      table.increments('sr_number').primary()
        .index('index_srno', 'btree').notNull();
      table.integer('trackingNo').references('glocalId').inTable('case_monitoring')
        .index('index_sr_tracking', 'btree').notNull().onUpdate('cascade');
      table.timestamp('timeIn')
        .index('index_sr_timein', 'hash').notNull();
      table.timestamp('timeOuts')
        .index('index_sr_timeouts', 'hash').notNull();
      table.varchar('productName', 300).references('productName').inTable('products')
        .index('index_sr_activityproduct', 'hash').notNull().onUpdate('cascade');
      table.varchar('client', 400).references('accountName').inTable('client')
        .index('index_sr_activityclient', 'hash').notNull().onUpdate('cascade');
      table.varchar('addres', 400)
        .index('index_sr_activityaddress', 'hash').notNull();
      table.enu('typeOfActivity', ['Onsite', 'Implementation', 'Remote', 'POC'])
        .index('index_sr_typeactivity', 'hash').notNull();
      table.varchar('purposeOfVisit', 200)
        .index('index_sr_purpose', 'hash').notNull();
      table.text('activityPerformed')
        .index('index_sr_performed', 'hash').notNull();
      table.text('nextActivity')
        .index('index_sr_nextactivity', 'hash').notNull();
      table.text('recommendations').index('index_sr_recommendations', 'hash');
      table.specificType('assignedSystemsEngineer', 'text[]')
        .index('index_sr_assignedengineer', 'hash').notNull();
      table.varchar('point_person', 50)
        .index('index_sr_point', 'hash').notNull();
    }),

    knex.schema.createTable('activities', (table) => {
      table.increments('activityNo').index('index_activityNo', 'btree');
      table.integer('trackingNo').references('glocalId').inTable('case_monitoring')
        .index('index_tracking', 'btree').notNull().onUpdate('cascade');
      table.timestamp('timeIn')
        .index('index_timein', 'hash').notNull();
      table.timestamp('timeOuts')
        .index('index_timeouts', 'hash').notNull();
      table.varchar('productName', 300).references('productName').inTable('products')
        .index('index_activityproduct', 'hash').notNull().onUpdate('cascade');
      table.varchar('client', 400).references('accountName').inTable('client')
        .index('index_activityclient', 'hash').notNull().onUpdate('cascade');
      table.varchar('addres', 400)
        .index('index_activityaddress', 'hash').notNull();
      table.enu('typeOfActivity', ['Onsite', 'Implementation', 'Remote', 'POC'])
        .index('index_typeactivity', 'hash').notNull();
      table.varchar('purposeOfVisit', 200)
        .index('index_purpose', 'hash').notNull();
      table.text('activityPerformed')
        .index('index_performed', 'hash').notNull();
      table.text('nextActivity')
        .index('index_nextactivity', 'hash').notNull();
      table.text('recommendations').index('index_recommendations', 'hash');
      table.specificType('assignedSystemsEngineer', 'text[]')
        .index('index_assignedengineer', 'hash').notNull();
      table.varchar('point_person', 50)
        .index('index_activity_point', 'hash').notNull();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('activities'),
    knex.schema.dropTable('service_reports'),
    knex.schema.dropTable('case_monitoring'),
    knex.schema.dropTable('license'),
    knex.schema.dropTable('products'),
    knex.schema.dropTable('vendor'),
    knex.schema.dropTable('client'),
    knex.schema.dropTable('user')
  ]);
};
