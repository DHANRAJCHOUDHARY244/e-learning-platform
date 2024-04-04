const logger = require('../utils/pino');

const query = require('../config/database').query

const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT  NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name  VARCHAR(255),
  role TEXT[] DEFAULT ARRAY['user']
);
`;

// Create the users table if it doesn't exist
async function createTable(Query) {
  try {
    await query(Query);
    logger.info('User table created successfully');
  } catch (err) {
    logger.error('Error creating user table:' + err);
  }
}


exports.createTables = async () => {
  await createTable(createUserTableQuery);
}