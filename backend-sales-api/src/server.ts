import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs/promises";
import { parseCsv, aggregateSales } from "./services/csvProcessor";
import { saveFile } from "./services/fileWriter";
import { errorHandler } from "./services/errorHandler";

const app = express();
const PORT = 3000;

// Enable CORS for all origins (you can customize for production)
app.use(cors());

// Serve static files (processed CSVs) publicly from /public
app.use("/public", express.static(path.resolve("./public")));

const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /upload-csv
 * Handles CSV file upload, parsing, aggregation, and returns download URL.
 */
app.post(
  "/upload-csv",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const { buffer, originalname } = req.file;
      const csvString = buffer.toString();

      // Parse CSV and aggregate sales per department
      const records = parseCsv(csvString);
      const aggregated = aggregateSales(records);

      // Create CSV content for aggregated results
      let csvOutput = "Department Name,Total Sales\n";
      for (const [dept, total] of Object.entries(aggregated)) {
        csvOutput += `${dept},${total}\n`;
      }

      // Ensure /public directory exists
      const publicDir = path.resolve("./public");
      await fs.mkdir(publicDir, { recursive: true });

      // Save aggregated CSV file with a unique name
      const timestamp = Date.now();
      const savedFileName = `aggregated_${timestamp}_${originalname}`;
      const savePath = path.join(publicDir, savedFileName);

      await saveFile(Buffer.from(csvOutput), savePath);

      console.log(`Aggregated file saved: ${savedFileName}`);

      // Send back download URL to client
      res.json({
        downloadUrl: `http://localhost:${PORT}/public/${savedFileName}`,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Centralized error handling middleware (logs and returns JSON error)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
