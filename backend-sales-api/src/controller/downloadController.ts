import { Request, Response } from "express";
import path from "path";

export const handleDownload = (req: Request, res: Response) => {
  const { fileId } = req.params;

  // Construct full path to the file you want to serve
  // Assume files are saved in /public/processed/ with .csv extension
  const filePath = path.resolve(`./public/processed/${fileId}.csv`);

  // Send the file to client
  res.download(filePath, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(404).json({ error: "File not found" });
    }
  });
};
