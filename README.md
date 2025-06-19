📦 CSV Sales Processor – Backend Developer Project
A Node.js + TypeScript backend that processes large CSV files using streaming. It aggregates department sales totals, generates a downloadable CSV, and returns performance metrics.

🚀 How to Run the App
1. Clone & Install
bash
Copy
Edit
git clone https://github.com/your-username/csv-sales-processor.git
cd csv-sales-processor/backend
npm install
2. Set Up Environment Variables
Create a .env file in the backend directory:

ini
Copy
Edit
API_KEY=your_super_secret_key
3. Start the Server (Development Mode)
bash
Copy
Edit
npm run dev
Server will be running at:
📍 http://localhost:3000

🧪 How to Test
Run Unit Tests
bash
Copy
Edit
npm run test
View Coverage Report
bash
Copy
Edit
npm run test:coverage
Test Coverage Includes:
csvProcessor.ts

fileWriter.ts

Aggregation and parsing logic

📂 File Structure
bash
Copy
Edit
backend/
│
├── public/                     # Processed CSVs for download
│
├── src/
│   ├── controller/
│   │   ├── uploadController.ts
│   │   ├── downloadController.ts
│   │   └── statusController.ts
│   │
│   ├── middleware/
│   │   └── upload.ts           # Async wrapper for safe routing
│   │
│   ├── queues/
│   │   ├── csvQueue.ts
│   │   └── uploadQueue.ts
│   │
│   ├── routes/
│   │   ├── upload.ts
│   │   ├── uploadRoutes.ts
│   │   └── downloadRoutes.ts
│   │
│   ├── services/
│   │   ├── authMiddleware.ts
│   │   ├── csvProcessor.ts
│   │   ├── fileWriter.ts
│   │   └── errorHandler.ts
│   │
│   └── types/
│       └── index.d.ts
🧠 Algorithm & Design
🔄 How it Works
User uploads a .csv file

csvProcessor.ts streams and parses the file using csv-parser

Each row is aggregated by department in a Map

fileWriter.ts generates a new CSV file

API responds with:

✅ Download link

✅ Metrics (processing time, department count)

🧮 Efficiency Strategy
✅ Memory-Efficient Design
CSV files are streamed using fs.createReadStream

Processing is done line-by-line with csv-parser

Aggregated data is stored in memory using a Map

Final file is written with fs.createWriteStream

✅ Time & Space Complexity
Operation	Time	Space
CSV Streaming	O(n)	O(d)
Aggregation	O(n)	O(d)
File Writing	O(d)	O(d)

n: number of rows in the CSV

d: number of unique departments

🔐 API Security
All routes are protected via API key header:

http
Copy
Edit
x-api-key: your_super_secret_key
🧪 Sample API Usage
📤 POST /upload
bash
Copy
Edit
curl -X POST http://localhost:3000/upload \
  -H "x-api-key: your_super_secret_key" \
  -F "file=@sales.csv"
📥 GET /download/:fileId
bash
Copy
Edit
curl http://localhost:3000/download/your-file-id.csv \
  -H "x-api-key: your_super_secret_key"