import express from "express";
import multer from "multer";
import {
  addProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";
import { protectAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

// 🖼️ Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Routes
router.post("/add", protectAdmin, upload.array("images", 10), addProperty);
router.get("/list", getProperties);
router.get("/:id", getPropertyById);
router.put("/edit/:id", protectAdmin, upload.array("images", 10), updateProperty);
router.delete("/delete/:id", protectAdmin, deleteProperty);

export default router;
