import { parse } from "csv-parse";
import * as fs from "fs";

// reference: https://csv.js.org/parse/examples/async_iterator/

// Reading the entire file here for the sake of simplicity.
// Could instead take a callback function to execute logic
// as the file is being read, if we're expecting CSV files to be exceptionally large.
export async function readFromCSV<T = unknown>(
  path: string
): Promise<Array<T>> {
  if (!fs.existsSync(path)) {
    throw new Error(`bad CSV path, no such file: ${path}`);
  }

  const records: Array<T> = [];
  const parser = fs
    .createReadStream(path)
    .pipe(parse({ columns: true, cast: true }));

  for await (const record of parser) {
    // TODO: validate against given type?
    records.push(record);
  }

  return records;
}
