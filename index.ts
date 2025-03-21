import { parse } from "csv-parse";
import * as fs from "fs";

export async function calculateRentPerTenant(propertyId: string) {
  const [tenants, rent] = await Promise.all([
    new Promise<number>((resolve) => {
      let tenants = 0;
      fs.createReadStream("data/technical-challenge-tenants-september-2024.csv")
        .pipe(parse({ columns: true }))
        .on("data", (row) => {
          if (row.propertyId === propertyId) {
            tenants++;
          }
        })
        .on("end", () => resolve(tenants));
    }),
    new Promise<number>((resolve) => {
      const propertiesStream = fs
        .createReadStream(
          "data/technical-challenge-properties-september-2024.csv"
        )
        .pipe(parse({ columns: true }))
        .on("data", (row) => {
          if (row.id === propertyId) {
            propertiesStream.destroy();
            resolve(Number(row.monthlyRentPence));
          }
        });
    }),
  ]);

  return Math.floor(rent / tenants);
}
