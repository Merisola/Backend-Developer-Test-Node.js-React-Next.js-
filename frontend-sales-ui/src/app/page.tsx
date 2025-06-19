"use client";
import React, { useState } from "react";
import { uploadFile } from "../lib/uploadFile"; // Adjust path as needed

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const url = await uploadFile(file, setProgress);
      setDownloadLink(url);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <main className="p-4 bg-gray-400">
      <h1 className="text-xl font-bold mb-4">Upload Sales CSV</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        className="mt-2 bg-blue-500 text-white p-2 rounded"
      >
        Upload
      </button>

      {progress > 0 && <p>Uploading: {progress}%</p>}
      {downloadLink && (
        <p>
          Download result: <a href={downloadLink}>Click here</a>
        </p>
      )}
    </main>
  );
}
