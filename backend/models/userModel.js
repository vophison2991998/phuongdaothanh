// models/userModel.js
import pool from "../config/db.js";   // <--- QUAN TRỌNG: phải có dòng này



export const findUserByUsername = async (username) => {
  const query = `
    SELECT 
      users.id,
      users.username,
      users.password_hash,
      roles.name AS role_name
    FROM users
    LEFT JOIN roles ON roles.id = users.role_id
    WHERE users.username = $1
  `;
  const result = await pool.query(query, [username]);
  return result.rows[0];
};
export async function findUserByEmail(email) {
  const res = await db.query("SELECT u.*, r.name as role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE email=$1", [email]);
  return res.rows[0];
}

export  async function findUserById(id) {
  const res = await db.query("SELECT u.*, r.name as role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.id=$1", [id]);
  return res.rows[0];
}

export  async function getAllUsers() {
  const res = await db.query("SELECT u.*, r.name as role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id ORDER BY u.id");
  return res.rows;
}

export async function createUser({ full_name, email, passwordHash, role_id }) {
  const res = await db.query(
    "INSERT INTO users (full_name, email, password, role_id) VALUES ($1,$2,$3,$4) RETURNING *",
    [full_name, email, passwordHash, role_id]
  );
  return res.rows[0];
}

export async function updateUser(id, { full_name, email, passwordHash, role_id }) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (full_name) { fields.push(`full_name=$${idx++}`); values.push(full_name); }
  if (email) { fields.push(`email=$${idx++}`); values.push(email); }
  if (passwordHash) { fields.push(`password=$${idx++}`); values.push(passwordHash); }
  if (role_id) { fields.push(`role_id=$${idx++}`); values.push(role_id); }

  if (fields.length === 0) return findUserById(id);

  values.push(id);
  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id=$${values.length} RETURNING *`;
  const res = await db.query(sql, values);
  return res.rows[0];
}

export async function deleteUser(id) {
  const res = await db.query("DELETE FROM users WHERE id=$1 RETURNING *", [id]);
  return res.rows[0];
}


