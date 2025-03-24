import { parse } from "csv-parse";
import * as fs from "fs";
import { ZodSchema } from "zod";

export async function readFromCSV<T = unknown>(
  path: string,
  schema?: ZodSchema<T>
): Promise<Array<T>> {
  if (!fs.existsSync(path)) {
    throw new Error(`bad CSV path, no such file: ${path}`);
  }

  const records: Array<T> = [];
  const parser = fs
    .createReadStream(path)
    .pipe(parse({ columns: true, cast: true }));

  // reference: https://csv.js.org/parse/examples/async_iterator/
  for await (const record of parser) {
    if (schema) {
      const result = schema.safeParse(record);
      if (!result.success) {
        throw new Error(
          `validation failed on row: ${JSON.stringify(record)}
          errors: ${result.error}`
        );
      }

      records.push(result.data);
    } else {
      // no schema provided, just push whatever data we got
      records.push(record);
    }
  }

  return records;
}
