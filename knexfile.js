// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://username:password@localhost:port/irisdb'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
