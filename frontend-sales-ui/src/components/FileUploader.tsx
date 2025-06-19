"use client";
import React, { useRef } from "react";
import axios from "axios";

const FileUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const downloadLinkRef = useRef<HTMLDivElement>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    const file = fileInputRef.current?.files?.[0];
    if (!file) return alert("Please select a CSV file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload-csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total!);
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${percent}%`;
              progressBarRef.current.textContent = `${percent}%`;
            }
          },
        }
      );

      if (downloadLinkRef.current) {
        downloadLinkRef.current.innerHTML = `
          <a 
            href="${response.data.downloadUrl}" 
            download 
            target="_blank"
            class="text-blue-600 hover:underline font-medium"
          >
            Download Processed File
          </a>`;
      }
    } catch (error) {
      alert("Upload failed");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-6">
      <div>
        <label
          htmlFor="csv-upload"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Select a CSV file:
        </label>
        <input
          id="csv-upload"
          type="file"
          ref={fileInputRef}
          accept=".csv"
          required
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Upload
      </button>

      <div className="w-full h-5 bg-gray-200 rounded overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-green-500 text-white text-center text-xs leading-5"
          style={{ width: "0%" }}
        ></div>
      </div>

      <div
        ref={downloadLinkRef}
        className="text-center text-sm text-gray-700 font-medium"
      ></div>
    </form>
  );
};

export default FileUploader;
