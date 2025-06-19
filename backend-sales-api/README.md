# Backend Sales API & Frontend CSV Processor

This project is a full-stack application that allows users to upload large CSV files containing departmental sales data, processes the data on the backend using streaming for memory efficiency, aggregates sales totals per department, and returns a downloadable CSV file with results. The frontend provides a simple UI for file upload and download.

---

## Features

- Backend API built with Node.js, Express.js, and TypeScript
- Efficient CSV processing with streams (csv-parser)
- File uploads handled via Multer
- Frontend built with React or Next.js (TypeScript)
- Upload progress indicator and download link
- Modular, scalable, and testable codebase
- UUID-based output filenames for uniqueness
- Basic security for routes (optional)
- Background processing with worker threads or Bull queue (optional)
- Unit tests with Jest (backend)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Git

### Backend Setup

```bash
cd backend-sales-api
npm install
npm run dev
