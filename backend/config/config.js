module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'ridesphere',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  }
};


