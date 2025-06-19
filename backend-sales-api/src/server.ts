import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import { handleUpload } from "./controller/uploadController";
import { errorHandler } from "./services/errorHandler";
import downloadRoutes from "./routes/downloadRoutes";

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

// Serve static files (processed CSVs) from /public directory
app.use("/public", express.static(path.resolve("./public")));

app.use(downloadRoutes);

// Configure multer for in-memory file uploads
const upload = multer({ storage: multer.memoryStorage() });

// POST route to handle CSV uploads and processing
app.post("/upload-csv", upload.single("file"), handleUpload);

// Global error handler middleware to catch and respond to errors
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
