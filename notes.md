create directory
	express

createdb

npm install --save knex pg

knex init
	fix knexfile

knex migrate:make create-[tablename]
	(migrations folder)
	table.increments().primary().notNull; for ID

    knex migrate:latest

knex seed:make 01_[tablename]
knex seed:run