// /services/fileWriter.ts
import fs from "fs/promises";

/**
 * Saves a file buffer to disk asynchronously.
 * @param fileBuffer - Buffer containing file data.
 * @param fullPath - Full path including filename where to save the file.
 * @returns Promise resolved on success, rejects on failure.
 */
export async function saveFile(fileBuffer: Buffer, fullPath: string): Promise<void> {
  await fs.writeFile(fullPath, fileBuffer);
}
