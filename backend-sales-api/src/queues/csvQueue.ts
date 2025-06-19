import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import path from "path";
import fs from "fs/promises";

const connection = new IORedis();

// Worker processes jobs from queue
export const worker = new Worker(
  "csv-processing",
  async (job) => {
    console.log(`Processing job ${job.id}`);

    // Simulate CPU heavy or IO heavy task here
    // For example, parse CSV, analyze data, write result file

    // Here, just create a dummy result file
    const resultFile = path.resolve(`./public/results/result-${job.id}.txt`);
    await fs.writeFile(resultFile, `Result for job ${job.id}`);

    return { resultFile }; // Return path or any data about results
  },
  { connection }
);
