import express from "express";
import multer from "multer";
import { handleUpload } from "../controller/uploadController";
import { authenticateApiKey } from "../services/authMiddleware";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", authenticateApiKey, upload.single("file"), handleUpload);

export default router;
