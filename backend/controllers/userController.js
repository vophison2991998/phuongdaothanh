// controllers/userController.js
import bcrypt from "bcrypt";
import { getAllUsers, findUserById, createUser, updateUser, deleteUser } from "../models/userModel";

// List users (permission: READ_USER)
async function listUsers(req, res) {
  try {
    const rows = await getAllUsers();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getUser(req, res) {
  try {
    const id = parseInt(req.params.id);
    const user = await findUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Staff can only read self
    if (req.user.role_name === "STAFF" && req.user.id !== id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// Create user (permission: CREATE_USER)
async function createUserHandler(req, res) {
  try {
    const { full_name, email, password, role_id } = req.body;
    if (!email || !password || !role_id) return res.status(400).json({ message: "Missing fields" });

    // Admin cannot create ADMIN or SUPER_ADMIN (business rule)
    if (req.user.role_name === "ADMIN" && role_id === 1) {
      return res.status(403).json({ message: "ADMIN cannot create SUPER_ADMIN" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({ full_name, email, passwordHash, role_id });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// Update user
async function updateUserHandler(req, res) {
  try {
    const id = parseInt(req.params.id);
    const target = await findUserById(id);
    if (!target) return res.status(404).json({ message: "User not found" });

    // STAFF can only update self
    if (req.user.role_name === "STAFF" && req.user.id !== id) return res.status(403).json({ message: "Forbidden" });

    // ADMIN cannot update SUPER_ADMIN
    if (req.user.role_name === "ADMIN" && target.role_name === "SUPER_ADMIN") return res.status(403).json({ message: "Forbidden" });

    const { full_name, email, password, role_id } = req.body;
    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;

    const updated = await updateUser(id, { full_name, email, passwordHash, role_id });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// Delete user
async function deleteUserHandler(req, res) {
  try {
    const id = parseInt(req.params.id);
    const target = await findUserById(id);
    if (!target) return res.status(404).json({ message: "User not found" });

    // ADMIN cannot delete SUPER_ADMIN
    if (req.user.role_name === "ADMIN" && target.role_name === "SUPER_ADMIN") return res.status(403).json({ message: "Forbidden" });

    // STAFF cannot delete
    if (req.user.role_name === "STAFF") return res.status(403).json({ message: "Forbidden" });

    const deleted = await deleteUser(id);
    res.json({ deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { listUsers, getUser, createUserHandler, updateUserHandler, deleteUserHandler };
