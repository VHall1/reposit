import { parse } from "csv-parse";
import * as fs from "fs";

// Reading the entire file here for the sake of simplicity.
// Could instead take a callback function to execute logic
// as the file is being read, if we're expecting CSV files to be exceptionally large.
export function readFromCSV<T = unknown>(path: string): Promise<Array<T>> {
  return new Promise<Array<T>>((resolve, reject) => {
    if (!fs.existsSync(path)) {
      reject(new Error("bad CSV path"));
      return;
    }

    const data: Array<T> = [];
    fs.createReadStream(path)
      .pipe(parse({ columns: true, cast: true }))
      .on("data", (row) => {
        // TODO: validate against given type?
        data.push(row);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (err) => reject(err));
  });
}
