import { Request, Response, NextFunction } from "express";

const API_KEY = process.env.API_KEY || "your_default_api_key";

export const authenticateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Explicitly void return type
  const apiKey = req.header("x-api-key");

  if (!apiKey || apiKey !== API_KEY) {
    res.status(401).json({ error: "Unauthorized: Invalid API key" });
    return; // Return to prevent calling next()
  }

  next(); // Call next middleware if authorized
};
