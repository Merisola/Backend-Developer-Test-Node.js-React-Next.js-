import { Worker } from "bullmq";
import { processCSV } from "../services/csvProcessor";
import { writeFile } from "../services/fileWriter";
import path from "path";
import { config } from "dotenv";

config();

new Worker(
  "uploadQueue",
  async (job) => {
    const { fileBuffer, fileName, jobId } = job.data;

    // Process CSV and get aggregated sales object
    const parsedData = await processCSV(fileBuffer);

    // Convert aggregated data to CSV string
    const csvOutput = [
      "Department Name,Total Sales",
      ...Object.entries(parsedData).map(
        ([department, total]) => `${department},${total}`
      ),
    ].join("\n");

    // Define output file path
    const outputPath = path.join(__dirname, `../public/${jobId}.csv`);

    // Write CSV string as Buffer to file
    await writeFile(Buffer.from(csvOutput), outputPath);

    return { outputPath };
  },
  {
    connection: {
      url: process.env.REDIS_URL!,
    },
  }
);
