import express from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/userController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/list",  getAllUsers); // Admin Protected
export default router;
