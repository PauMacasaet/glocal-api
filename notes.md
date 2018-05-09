#create directory
	express

#createdb -U postgres -h localhost -p 5432 irisdb

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
    
    heroku pg:info

    heroku run knex migrate:latest
    heroku run knex seed:run

#backup and restore db
    install postgres psql

    heroku pg:psql --app iris-carbon-api
    heroku pg:backups:capture --app iris-carbon-api
    heroku pg:backups:download --app iris-carbon-api
    heroku pg:backups:restore --app iris-carbon-api

#db stuff

    pg_dump -U postgres -h localhost -p 5432 --data-only irisdb > backup
    psql -U postgres -h localhost -p 5432 irisdb < backup.dump


#Clients Page Revised
    - for Account and Sales Managers
        - use /client/AM?accountManager=name for viewing clients where you (as user) are the account manager
    - Product Specialist should be able to add client
    - for Managing Director, Sales Director, Business Development Manager, Technical Manager, Project Manager, Team Lead
        - use /clients sees all clients (no change)
    - for Systems Engineer
        - no access to view clients page

#Case Page Revised
    - for Account and Sales Managers
        - use /glocalId/AM?accountManager=name to only see cases where you are Account/Sales Manager

#Reports Page Revised
    - for Managing Director, Sales Director, Business Development Manager, Technical Manager, Project Manager, Team Lead access only
    - others dont have access to reports

#Case Status Revised
    - anyone from Sales team should not be able to edit status

#Add/Edit Account and Login
    - add input validation 
        ex. Password is too short (minimum 6 characters)