import express from "express";
import multer from "multer";
import { handleFileUpload } from "../controller/uploadController";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), handleFileUpload);

export default router;
