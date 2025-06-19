// /types/csv.ts

/** Represents a single sales record from the CSV file */
export interface CsvRecord {
  departmentName: string;
  date: string; // ISO date string (YYYY-MM-DD)
  numberOfSales: number;
}

/** Aggregated sales totals by department */
export interface AggregatedSales {
  [departmentName: string]: number;
}
