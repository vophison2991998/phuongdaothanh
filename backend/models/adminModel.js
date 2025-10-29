import pool from "../config/db.js";

export const findAdminByUsername = async (username) => {
  const res = await pool.query("SELECT * FROM admin WHERE username = $1", [username]);
  return res.rows[0];
};
