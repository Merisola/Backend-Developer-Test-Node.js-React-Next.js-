## 📦 CSV Sales Processor – Backend Developer Project

This project is a Node.js + TypeScript backend for processing large CSV files via streaming. It aggregates department sales, writes a downloadable CSV, and returns processing metrics.

---

## 🚀 How to Run the App

### 1. Clone & Install

```bash
git clone https://github.com/your-username/csv-sales-processor.git
cd csv-sales-processor/backend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `backend` root:

```ini
API_KEY=your_super_secret_key
```

### 3. Start the Server (Dev Mode)

```bash
npm run dev
```

Your server will be running at:
📍 `http://localhost:3000`

---

## 🧪 How to Test

### Run Unit Tests

```bash
npm run test
```

### View Coverage Report

```bash
npm run test:coverage
```

Tests cover:

* `csvProcessor.ts`
* `fileWriter.ts`
* Aggregation and parsing logic

---

## 📂 File Structure

```
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
│   │   └── upload.ts           # Async error wrapper
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
│   ├── types/
│   │   └── index.d.ts
│   │
│   └── utils/                  # (Optional) filename generator, constants
```

---

## 🧠 Algorithm & Design

### 🔄 How it Works

1. User uploads a `.csv` file
2. `csvProcessor.ts` streams the CSV (via `csv-parser`)
3. Rows are processed line-by-line, and sales are aggregated by department
4. Results are passed to `fileWriter.ts` to generate a new CSV file
5. The backend responds with:

   * A download URL
   * Metrics: processing time, total departments

---

## 🧮 Efficiency Strategy

### ✅ Memory Efficient

* **Streaming** with `fs.createReadStream` + `csv-parser`
* **Write stream** with `fs.createWriteStream`
* Only the aggregate `Map` is kept in memory

### ✅ Time & Space Complexity

| Operation     | Time | Space |
| ------------- | ---- | ----- |
| CSV Streaming | O(n) | O(d)  |
| Aggregation   | O(n) | O(d)  |
| File Writing  | O(d) | O(d)  |

* `n`: number of rows
* `d`: number of departments

---

## 🔐 API Security

All routes require a valid API key in the header:

```
x-api-key: your_super_secret_key
```

---

## 🧪 Sample API Usage

### POST `/upload`

```bash
curl -X POST http://localhost:3000/upload \
  -H "x-api-key: your_super_secret_key" \
  -F "file=@sales.csv"
```

### GET `/download/:fileId`

```bash
curl http://localhost:3000/download/uuid-filename.csv \
  -H "x-api-key: your_super_secret_key"
```



