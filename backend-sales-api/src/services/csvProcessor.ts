import { CsvRecord, AggregatedSales } from "../types/index";
import { parse } from "csv-parse/sync";

export function parseCsv(csvString: string): CsvRecord[] {
  const records = parse(csvString, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[];

  const parsedRecords: CsvRecord[] = records.map((row) => {
    const departmentName = row["Department Name"];
    const date = row["Date"];
    const numberOfSales = Number(row["Number of Sales"]);

    if (!departmentName || !date || isNaN(numberOfSales)) {
      throw new Error(`Invalid CSV row detected: ${JSON.stringify(row)}`);
    }

    return {
      departmentName,
      date,
      numberOfSales,
    };
  });

  return parsedRecords;
}

export function aggregateSales(records: CsvRecord[]): AggregatedSales {
  const result: AggregatedSales = {};

  for (const { departmentName, numberOfSales } of records) {
    if (!result[departmentName]) {
      result[departmentName] = 0;
    }
    result[departmentName] += numberOfSales;
  }

  return result;
}

/**
 * Processes raw CSV buffer and returns aggregated sales data along with metrics.
 * @param fileBuffer - Buffer of CSV file contents
 * @returns Object containing aggregated sales data and processing metrics
 */
export async function processCSV(
  fileBuffer: Buffer
): Promise<{
  aggregated: AggregatedSales;
  metrics: { processingTimeMs: number; departmentCount: number };
}> {
  const startTime = Date.now();

  const csvString = fileBuffer.toString("utf-8");
  const records = parseCsv(csvString);
  const aggregated = aggregateSales(records);

  // Calculate metrics
  const processingTimeMs = Date.now() - startTime;
  const departmentCount = Object.keys(aggregated).length;

  return {
    aggregated,
    metrics: {
      processingTimeMs,
      departmentCount,
    },
  };
}
