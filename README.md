# Sales CSV Upload and Aggregation App

A full-stack application that allows users to upload CSV files containing sales data, aggregates total sales by department, and provides downloadable processed CSV files. Built with a Node.js/Express backend (TypeScript) and a React/Next.js frontend.

---

## Features

- Upload CSV files with sales records
- Efficient CSV parsing with streaming to handle large files
- Aggregate sales totals by department
- Save aggregated data as a new CSV file
- Serve processed files for download
- Show upload progress on the frontend
- Modular backend code with TypeScript typings
- Centralized error handling middleware

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo/backend
Install backend dependencies:

bash
Copy
Edit
npm install
Start the backend server:

bash
Copy
Edit
npm run dev
In a separate terminal, navigate to the frontend folder and install dependencies:

bash
Copy
Edit
cd ../frontend
npm install
npm run dev
Open your browser to http://localhost:3000 and start uploading CSV files.

CSV File Format
The expected CSV input format is:

csv
Copy
Edit
Department Name,Date,Number of Sales
Electronics,2023-08-01,100
Clothing,2023-08-01,200
Electronics,2023-08-02,150
Project Structure
bash
Copy
Edit
/backend
  /services        # Business logic for CSV parsing, aggregation, file saving, error handling
  /types           # TypeScript interfaces and types
  /public          # Public directory for processed CSV downloads
  server.ts        # Express server entrypoint

/frontend
  /components      # React components (FileUploader, UI elements)
  /pages           # Next.js pages
  ...
How It Works
The frontend allows users to select and upload a CSV file.

The file is sent to the backend /upload-csv endpoint using Axios as FormData.

The backend uses a streaming CSV parser to process large files efficiently without high memory consumption.

Sales totals are aggregated by department using a Map for O(n) performance.

The aggregated data is converted back to CSV format and saved in the /public directory.

The backend responds with a download URL for the processed file.

The frontend shows upload progress and displays the download link when ready.

Memory Handling
Files are streamed during parsing and writing to avoid loading entire files into memory.

Multer temporarily stores file uploads in memory before processing.

This design enables handling of large CSV files efficiently.

Time and Space Complexity
Operation	Time Complexity	Space Complexity
Streaming CSV Parse	O(n)	O(1) (line-by-line processing)
Aggregation	O(n)	O(k) where k = unique departments
Writing CSV Output	O(k)	O(1) (streamed output)

Error Handling
Centralized Express middleware handles errors.

Returns JSON error responses with appropriate HTTP status codes.

Logs errors server-side for easier debugging.