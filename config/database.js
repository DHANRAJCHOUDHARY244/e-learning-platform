const { Client } = require('pg');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const client = new Client({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // You may need to adjust this based on your PostgreSQL server configuration
  },
});

async function getPgVersion() {
    
    try {
        await client.connect();
        console.log('====================================');
        console.log('Connected to PostgreSQL database');
        console.log('====================================');
      const result = await client.query('SELECT version()');
      console.log(result.rows[0]);
    } catch (err) {
      console.error('Error executing query:', err);
    } finally {
      await client.end();
    }
  }
  
  getPgVersion();

  module.exports = {
    query: (text, params) => pool.query(text, params),
  };