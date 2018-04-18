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
    install postgres psql

    heroku pg:psql --app iris-carbon-api
    heroku pg:backups:capture --app iris-carbon-api
    heroku pg:backups:download --app iris-carbon-api
    heroku pg:backups:restore --app iris-carbon-api

#db stuff
    heroku pg:info
    


#FIXES AS OF APRIL 17

    - use /activityNo endpoint for GET CREATE UPDATE DELETE activities
    - use /tracking endpoint for GET activities by trackingNo
    - removed sr_number from activities table cos its useless 
    - use /glocalId for GET cases. Additional Field is glocal_id showing "yyyy - glocalId" format in glocalId column
    - use /userSE? for GET cases. Additional Field is glocal_id showing "yyyy - glocalId" format in glocalId column
    - use /activityNo for GET cases. Additional Field is glocal_id SHOWING "yyyy - glocalId" format
    - use /tracking for GET cases. Additional Field is glocal_id showing "yyyy - glocalId" format
    - DONT CHANGE glocalId fetch for CREATE UPDATE DELETE GET BY ID
    - DELETE buttons for License, Account, Case, Activity
    - SE page where you can view each SE's activity log

    - Reports page (to follow)

    NOTE: when adding an activity in the payload make sure the times are different, preferably one after another

#ADDITIONS 

    glocal_id item for getting 'yyyy - glocalId' format : DISPLAY AND SEARCH PURPOSES ONLY
        FETCH from /glocalId, /activityNo, /tracking
    glocalId item from /glocalId: still the same sort, post, update, delete