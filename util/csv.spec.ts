import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { z } from "zod";
import { readFromCSV } from "./csv";

describe("readFromCSV", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "csv-test-"));

  afterAll(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  test("reads and parses a valid CSV file", async () => {
    const csvContent = `name,age
Alice,30
Bob,25
`;

    const filePath = path.join(tempDir, "valid.csv");
    fs.writeFileSync(filePath, csvContent);

    const result = await readFromCSV<{ name: string; age: number }>(filePath);
    expect(result).toEqual([
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
    ]);
  });

  test("returns an empty array for an empty CSV file", async () => {
    const filePath = path.join(tempDir, "empty.csv");
    fs.writeFileSync(filePath, "");

    const result = await readFromCSV(filePath);
    expect(result).toEqual([]);
  });

  test("throws an error when the CSV file does not exist", async () => {
    const fakePath = path.join(tempDir, "non-existent.csv");
    await expect(readFromCSV(fakePath)).rejects.toThrow(/bad CSV path/i);
  });

  test("throws an error when zod validation fails", async () => {
    const csvContent = `name,age
Alice,30
Bob,25
`;

    const filePath = path.join(tempDir, "invalid.csv");
    fs.writeFileSync(filePath, csvContent);

    const schema = z.object({ name: z.string(), age: z.string() });

    await expect(readFromCSV(filePath, schema)).rejects.toThrow(
      /validation failed/i
    );
  });
});
