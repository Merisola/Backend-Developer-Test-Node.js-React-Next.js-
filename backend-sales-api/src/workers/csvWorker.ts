import { parentPort } from "worker_threads";
import path from "path";
import { parseCsv, aggregateSales } from "../services/csvProcessor";
import { writeFile } from "../services/fileWriter";

parentPort?.on("message", async (data) => {
  try {
    const { csvString, originalName } = data;

    const records = parseCsv(csvString);
    const aggregated = aggregateSales(records);

    const csvOutput = [
      "Department Name,Total Sales",
      ...Object.entries(aggregated).map(([dept, total]) => `${dept},${total}`),
    ].join("\n");

    const timestamp = Date.now();
    const savedFileName = `aggregated_${timestamp}_${originalName}`;
    const savePath = path.resolve("./public", savedFileName);

    await writeFile(Buffer.from(csvOutput), savePath);

    parentPort?.postMessage({
      success: true,
      downloadUrl: `http://localhost:3000/public/${savedFileName}`,
    });
  } catch (error) {
    parentPort?.postMessage({
      success: false,
      error: (error as Error).message,
    });
  }
});
