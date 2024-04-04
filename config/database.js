const { Client } = require('pg');
require('dotenv').config();
const logger = require('../utils/pino')
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const client = new Client({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  // ssl: {
  //   rejectUnauthorized: false, // You may need to adjust this based on your PostgreSQL server configuration
  // },
});

async function dbConnect() {

  try {
    await client.connect();
    const result = await client.query('SELECT version()');
    logger.info('Connected to PostgreSQL database ' + JSON.stringify(result.rows[0]));
  } catch (err) {
    logger.error('Error executing query:', err);
  } finally {
    await client.end();
  }
}


module.exports = {
  query: (text, params) => client.query(text, params), dbConnect
}; 