import { Request, Response, NextFunction } from "express";
import { Worker } from "worker_threads";
import path from "path";

/**
 * Handles CSV file upload by offloading processing to a worker thread.
 * Returns download URL upon successful processing or error on failure.
 * @param req Express request, expects multer to attach `req.file`.
 * @param res Express response for JSON output.
 * @param next Express next middleware function for error handling.
 */
export const handleUpload = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    // Support both memory and disk storage
    const csvString =
      req.file.buffer?.toString() ||
      require("fs").readFileSync(req.file.path, "utf8");

    const originalName = req.file.originalname;

    // Path to compiled .js worker
    const workerPath = path.resolve(__dirname, "../workers/csvWorker.js");

    const worker = new Worker(workerPath, {
      workerData: { csvString, originalName },
    });

    worker.on("message", (result) => {
      if (result.success) {
        res.status(200).json({
          message: "File processed successfully",
          downloadUrl: result.downloadUrl,
          metrics: result.metrics, // Add metrics if available
        });
      } else {
        res
          .status(500)
          .json({ error: result.error || "Unknown processing error" });
      }
      worker.terminate();
    });

    worker.on("error", (error) => {
      console.error("Worker thread error:", error);
      res.status(500).json({ error: error.message });
      worker.terminate();
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });
  } catch (err) {
    next(err);
  }
};
