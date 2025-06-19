import express from "express";
import multer from "multer";
import { handleUpload } from "../controller/uploadController";
import { getJobStatus } from "../controller/statusController";
import { authenticateApiKey } from "../services/authMiddleware";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Helper to wrap async route handlers and forward errors to Express error handler
const asyncHandler =
  (fn: Function) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Upload route (secure + memoryStorage)
router.post(
  "/upload",
  authenticateApiKey,
  upload.single("file"),
  asyncHandler(handleUpload)
);

// Optional: Job status route (secure)
router.get("/job-status/:id", authenticateApiKey, asyncHandler(getJobStatus));

export default router;
