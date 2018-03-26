// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://postgres:1Paulomac@localhost:5432/irisdb'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};
