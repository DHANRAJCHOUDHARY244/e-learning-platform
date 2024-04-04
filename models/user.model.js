const query = require('../config/database').query

async function createUser(userData) {
    const keys = Object.keys(userData);
    const values = Object.values(userData);
  
    try {
      const sql = `INSERT INTO users (${keys.join(', ')}) VALUES (${keys.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING *`;
      return (await query(sql, values)).rows[0];
    } catch (err) {
      console.error('Error inserting user:', err);
      return null;
    }
  }

async function getUsers() {
    try {
        return (await query('SELECT * FROM users')).rows;
    } catch (err) {
        console.error('Error getting users:', err);
        return null;
    }
}

async function updateUser(id, updates) {
    try {
        const values = Object.values(updates);
        const sql = `UPDATE users SET ${Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(', ')} WHERE id = $${values.length + 1} RETURNING *`;
        return (await query(sql, [...values, id])).rows[0];
    } catch (err) {
        console.error('Error updating user:', err);
        return null;
    }
}

async function deleteUser(id) {
    try {
        await query('DELETE FROM users WHERE id = $1', [id]);
        console.log('User deleted successfully');
    } catch (err) {
        console.error('Error deleting user:', err);
    }
}

module.exports = { createUser, getUsers, updateUser, deleteUser };
