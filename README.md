📦 CSV Sales Processor – Backend Developer Project
This is a full-stack application that allows users to upload large CSV files of sales data. The backend streams and processes the CSV to aggregate total sales per department, then returns a downloadable CSV file along with performance metrics.

🚀 How to Run the App
📁 Clone the Repo
bash
Copy
Edit
git clone https://github.com/your-username/csv-sales-processor.git
cd csv-sales-processor
🛠️ Backend Setup
bash
Copy
Edit
cd backend
npm install
cp .env.example .env
# Set your API_KEY in .env
npm run dev
Runs on http://localhost:3000

🌐 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
Runs on http://localhost:3001 (or whichever port Vite/Next.js chooses)

🧪 How to Test
🔬 Unit Tests (Backend)
bash
Copy
Edit
cd backend
npm run test
This runs unit tests for:

parseCsv (CSV parsing logic)

aggregateSales (sales aggregation logic)

fileWriter (writes processed CSV file)

Test framework: Jest
Test coverage is printed in the terminal. To view coverage summary:

bash
Copy
Edit
npm run test:coverage
📂 File Structure
pgsql
Copy
Edit
project-root/
│
├── backend/
│   ├── controllers/
│   │   ├── uploadController.ts
│   │   └── downloadController.ts
│   ├── routes/
│   │   └── index.ts
│   ├── services/
│   │   ├── csvProcessor.ts
│   │   ├── fileWriter.ts
│   │   └── authMiddleware.ts
│   ├── utils/
│   │   └── generateFilename.ts
│   ├── types/
│   │   └── index.ts
│   ├── tests/
│   │   └── csvProcessor.test.ts
│   ├── public/processed/  <-- generated downloadable files
│   └── server.ts
│
├── frontend/
│   ├── pages/ or app/
│   │   └── index.tsx
│   ├── components/
│   │   └── FileUploader.tsx
│   └── styles/
│
├── .env
├── .gitignore
└── README.md
🧠 Algorithm Explanation
✅ What it does:
Reads CSV with stream-based parser (csv-parser)

Aggregates sales totals per department using a Map

Writes the output as a new CSV file using fs.createWriteStream

Generates a UUID-named file for download

Returns metrics (processing time and department count) in the response

🧮 Memory Efficiency Strategy:
✅ Uses streaming (fs.createReadStream) to avoid loading the entire CSV into memory

✅ Processes line by line with csv-parser

✅ Aggregates in-memory using a Map (O(1) insert/lookup)

✅ Writes output using fs.createWriteStream to avoid buffering large strings

This makes the app capable of processing very large CSV files without crashing.

📈 Estimated Time & Space Complexity
Step	Time Complexity	Space Complexity
CSV Parsing (stream)	O(n)	O(d)
Aggregation	O(n)	O(d)
File Writing	O(d)	O(d)

n: number of rows in the CSV

d: number of unique departments (usually small)

Streaming ensures space is not dependent on n, which keeps memory usage low.

🔐 API Security
Upload and download routes are protected with an API key

Users must include the x-api-key header in every request

Example:

bash
Copy
Edit
curl -X POST http://localhost:3000/upload \
  -H "x-api-key: your_secret_key" \
  -F "file=@sales.csv"
