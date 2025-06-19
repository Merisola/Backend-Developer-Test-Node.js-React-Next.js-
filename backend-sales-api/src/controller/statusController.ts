import { Request, Response } from "express";
import { Job, Queue } from "bullmq";
import { config } from "dotenv";

config();

const queue = new Queue("uploadQueue", {
  connection: {
    url: process.env.REDIS_URL!,
  },
});

export const getJobStatus = async (req: Request, res: Response) => {
  const jobId = req.params.id;
  const job: Job | null = await queue.getJob(jobId);

  if (!job) {
    return res.status(404).json({ status: "not_found" });
  }

  const isCompleted = await job.isCompleted();
  const isFailed = await job.isFailed();

  if (isCompleted) {
    return res.json({
      status: "completed",
      downloadUrl: `/public/${jobId}.csv`,
    });
  } else if (isFailed) {
    return res.status(500).json({ status: "failed" });
  } else {
    return res.json({ status: "processing" });
  }
};
