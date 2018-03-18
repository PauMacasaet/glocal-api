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
    knex migrate:rollback for reset

knex seed:make 01_[tablename]
knex seed:run

setting up heroku app
    heroku login

    heroku create stickers-api-pau

    git push heroku master

    heroku open

adding DB
    heroku addons:create heroku-postgresql
    cloud db = heroku pg:psql

    heroku run knex migrate:latest
    heroku run knex seed:run