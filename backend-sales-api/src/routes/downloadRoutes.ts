import express from "express";
import { handleDownload } from "../controller/downloadController";
import { authenticateApiKey } from "../services/authMiddleware";

const router = express.Router();

router.get("/download/:fileId", authenticateApiKey, handleDownload);

export default router;
