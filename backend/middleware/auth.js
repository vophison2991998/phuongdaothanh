// middleware/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { findUserById } = require("../models/userModel");

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user info (id, role)
    const user = await findUserById(payload.userId);
    if (!user) return res.status(401).json({ message: "Invalid token user" });

    req.user = { id: user.id, email: user.email, role_name: user.role_name, role_id: user.role_id };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = authenticate;
