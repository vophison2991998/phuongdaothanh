// controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();
import { findUserByEmail } from "../models/userModel";

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

  const user = await findUserByEmail(email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const payload = { userId: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1d" });

  res.json({
    token,
    role: user.role_name,
    username: user.full_name || user.email,
    userId: user.id
  });
}

module.exports = { login };
