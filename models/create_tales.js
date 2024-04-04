const query=require('../config/database').query

const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);
`;

// Create the users table if it doesn't exist
async function createTable() {
    try {
      const client = await pool.connect();
      await query(createUserTableQuery);
      client.release();
      console.log('User table created successfully');
    } catch (err) {
      console.error('Error creating user table:', err);
    }
  }
  