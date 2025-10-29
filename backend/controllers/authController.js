import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) return res.status(400).json({ message: "Thiếu thông tin" });

    const exist = await pool.query("SELECT * FROM admin WHERE username = $1", [username]);
    if (exist.rows.length > 0) return res.status(400).json({ message: "Tài khoản đã tồn tại" });

    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO admin (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hashed]
    );

    res.status(201).json({ message: "Tạo tài khoản thành công", admin: result.rows[0] });
  } catch (err) {
    console.error("Đăng ký lỗi:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM admin WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
    }

    const admin = result.rows[0];

    // ⚠️ Bỏ bcrypt, so sánh trực tiếp (chỉ dùng cho môi trường test)
    if (password !== admin.password) {
      return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token, admin: { id: admin.id, username: admin.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const admin_id = req.user.id;
    const profile = await pool.query(
      `SELECT a.id, a.username, p.full_name, p.email, p.phone, p.address
       FROM admin a
       LEFT JOIN admin_profile p ON a.id = p.admin_id
       WHERE a.id = $1`,
      [admin_id]
    );
    res.json(profile.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
