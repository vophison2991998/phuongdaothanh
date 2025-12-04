import express from "express";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";   // ⬅ THÊM DÒNG NÀY

import {
  listUsers,
  getUser,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/userController.js";

const router = express.Router();

router.use(authenticate);  // bắt buộc login

// CRUD users có phân quyền
router.get("/", authorize("READ_USER"), listUsers);
router.get("/:id", authorize("READ_USER"), getUser);
router.post("/", authorize("CREATE_USER"), createUserHandler);
router.put("/:id", authorize("UPDATE_USER"), updateUserHandler);
router.delete("/:id", authorize("DELETE_USER"), deleteUserHandler);

export default router;
