#create directory
	express

#createdb

#npm install --save knex pg

#npm install --save-dev nodemon

#npm run dev

#knex init
	fix knexfile

#knex migrate:make create-[tablename]
	(migrations folder)
	table.increments().primary().notNull; for ID

    knex migrate:latest
    knex migrate:rollback for reset

knex seed:make 01_[tablename]
knex seed:run

#setting up heroku app
    heroku login

    heroku create stickers-api-pau

    git push heroku master

    heroku open

#adding DB
    heroku addons:create heroku-postgresql
    cloud db = heroku pg:psql

    heroku run knex migrate:latest
    heroku run knex seed:run

#backup and restore db
    heroku pg:backups:capture
    heroku pg:backups:download
    heroku pg:backups:restore

#db stuff
    heroku pg:info
    


#FIXES AS OF APRIL 17

    /activityNo post and update
    /tracking & /activityNo get for activities (regardless type) and sr_number

#ADDITIONS 

    glocal_id item for getting 'yyyy - glocalId' format : DISPLAY AND SEARCH PURPOSES ONLY
        FETCH from /glocalId, /activityNo, /tracking
    glocalId item from /glocalId: still the same sort, post, update, delete