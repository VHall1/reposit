import { parse } from "csv-parse";
import * as fs from "fs";

export async function calculateRentPerTenant(
  propertyId: string,
  options?: { currencyUnit: "minor" | "major" }
) {
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
    (async () => {
      const property = await findProperty(propertyId);
      // @ts-expect-error TODO: check if property actually exists
      return Number(property.monthlyRentPence);
    })(),
  ]);

  if (tenants === 0) {
    throw new Error("no tenants");
  }

  const rentInPence = Math.floor(rent / tenants);
  if (options?.currencyUnit === "major") {
    return rentInPence / 100.0;
  }

  return rentInPence;
}

async function findProperty(id: string) {
  return new Promise((resolve) => {
    const propertiesStream = fs
      .createReadStream(
        "data/technical-challenge-properties-september-2024.csv"
      )
      .pipe(parse({ columns: true }))
      .on("data", (row) => {
        if (row.id === id) {
          propertiesStream.destroy();
          resolve(row);
        }
      })
      .on("end", () => {
        resolve(undefined);
      });
  });
}
