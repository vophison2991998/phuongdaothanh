import express from "express";
import { registerAdmin, loginAdmin, getAdminProfile ,getAdminDetail} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", verifyToken, getAdminProfile);

export default router;
