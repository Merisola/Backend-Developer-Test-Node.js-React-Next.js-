// /services/csvProcessor.ts
import { CsvRecord, AggregatedSales } from "../types/index";
import { parse } from "csv-parse/sync";

/**
 * Parses a CSV string into an array of CsvRecord objects.
 * Expects CSV with headers: Department Name,Date,Number of Sales
 * @param csvString - Raw CSV file content as a string.
 * @returns Parsed array of CsvRecord objects.
 * @throws Throws if CSV parsing fails or data is invalid.
 */
export function parseCsv(csvString: string): CsvRecord[] {
  const records = parse(csvString, {
    columns: true, // first line is header
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[];

  // Map to typed CsvRecord array with validation
  const parsedRecords: CsvRecord[] = records.map((row) => {
    const departmentName = row["Department Name"];
    const date = row["Date"];
    const numberOfSales = Number(row["Number of Sales"]);

    if (!departmentName || !date || isNaN(numberOfSales)) {
      throw new Error(`Invalid CSV row: ${JSON.stringify(row)}`);
    }

    return {
      departmentName,
      date,
      numberOfSales,
    };
  });

  return parsedRecords;
}

/**
 * Aggregates total sales by department.
 * @param records - Array of CsvRecord objects.
 * @returns Object mapping department names to total sales.
 */
export function aggregateSales(records: CsvRecord[]): AggregatedSales {
  const result: AggregatedSales = {};

  for (const record of records) {
    if (!result[record.departmentName]) {
      result[record.departmentName] = 0;
    }
    result[record.departmentName] += record.numberOfSales;
  }

  return result;
}
