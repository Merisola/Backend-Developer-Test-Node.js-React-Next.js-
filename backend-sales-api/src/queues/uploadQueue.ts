// /services/processCSV.ts
import { parseCsv, aggregateSales } from "../services/csvProcessor";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function processCSV(
  fileBuffer: Buffer,
  originalFileName: string
): Promise<string> {
  const csvString = fileBuffer.toString("utf-8");

  // Parse CSV and aggregate
  const records = parseCsv(csvString);
  const totals = aggregateSales(records);

  // Generate unique filename
  const outputFileName = `${uuidv4()}-${originalFileName}`;
  const outputPath = path.resolve("./public", outputFileName);

  // Write output CSV
  const header = "Department Name,Total Sales\n";
  const rows = Object.entries(totals)
    .map(([dept, sales]) => `${dept},${sales}`)
    .join("\n");

  await fs.promises.writeFile(outputPath, header + rows, "utf-8");

  return outputFileName;
}
