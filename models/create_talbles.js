const { query } = require('../config/database');
const { hashPassword } = require('../services/passwordHashing.service');
const logger = require('../utils/pino');
const { getUsers } = require('./user.model');
const Query = require('../config/database').query;

const tableQueries = [
  {
    name: 'users',
    query: `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        profile_img_url TEXT DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255),
        role TEXT[] DEFAULT ARRAY['user']
      );
    `,
  },
  {
    name: 'courses',
    query: `
    CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      duration VARCHAR(255),
      rating FLOAT DEFAULT 0,
      description TEXT,
      category TEXT[], 
      instructor_id INT REFERENCES users(id),
      language VARCHAR(50),
      tag TEXT[],
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    );
  `,
  },
  {
    name: 'otp',
    query: `
    CREATE TABLE IF NOT EXISTS otp (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      otp VARCHAR(6) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
       expiration_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP + INTERVAL '10 minutes'
    );
    `,
  },
  {
    name: 'enrollments',
    query: `
      CREATE TABLE IF NOT EXISTS enrollments (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'ACTIVE',
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (course_id) REFERENCES courses(id),
        UNIQUE (user_id, course_id)
      );
    `,
  },
];

// Create a table
async function createTable(name, query) {
  try {
    await Query(query);
    logger.info(`${name} table created successfully`);
  } catch (err) {
    logger.error(`Error creating ${name} table: ${err}`);
  }
}

// Create all tables
exports.createTables = async () => {
  await Promise.all(tableQueries.map(({ name, query }) => createTable(name, query)));
};

exports.createAdmin = async () => {
  try {
    const password = process.env.ADMIN_PASSWORD
    const email=process.env.ADMIN_EMAIL
    if((await getUsers(email))) return logger.error('super Admin alredy created')
    const role = ['user', 'superAdmin']
    const passwordHash = await hashPassword(password)
    const sql = `INSERT INTO users (email,password,first_name,last_name,role) VALUES ($1,$2,$3,$4,$5) RETURNING *`
    const data = await query(sql, [email, passwordHash, 'super', 'admin', role])
    logger.info(`Admin created successfully + ${data}`)
  } catch (error) {
    logger.error(`Error creating admin : ${error}`)
  }
}