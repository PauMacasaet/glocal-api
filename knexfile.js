// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://postgres:1Paulomac@localhost:5432/irisdb'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
