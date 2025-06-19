import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { v4 as uuidv4 } from "uuid";

export const handleFileUpload = async (
  req: Request,
  res: Response
): Promise<void> => {
  const file = req.file;

  if (!file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const resultMap = new Map<string, number>();
  const outputFileName = `${uuidv4()}.csv`;
  const outputFilePath = path.join("uploads", outputFileName);

  const readStream = fs.createReadStream(file.path);
  const writeStream = fs.createWriteStream(outputFilePath);

  writeStream.write("Department Name,Total Number of Sales\n");

  readStream
    .pipe(csvParser())
    .on("data", (row) => {
      const department = row["Department Name"];
      const sales = parseInt(row["Number of Sales"], 10);

      if (!isNaN(sales)) {
        resultMap.set(department, (resultMap.get(department) || 0) + sales);
      }
    })
    .on("end", () => {
      for (const [department, totalSales] of resultMap.entries()) {
        writeStream.write(`${department},${totalSales}\n`);
      }

      writeStream.end(() => {
        res.status(200).json({
          message: "File processed successfully",
          downloadUrl: `http://localhost:3000/uploads/${outputFileName}`,
        });
      });
    })
    .on("error", (error) => {
      console.error("CSV Parsing error:", error);
      res.status(500).json({ error: "Failed to process file" });
    });
};
