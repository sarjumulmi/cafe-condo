module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite'
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
