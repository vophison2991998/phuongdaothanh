import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Lấy thông tin profile
router.get("/profile", verifyToken, getAdminProfile);

// ✅ Cập nhật profile
router.put("/profile", verifyToken, updateAdminProfile);

export default router;
