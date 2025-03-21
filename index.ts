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

export function validatePostcode(postcode: string): boolean {
  const parts = postcode.split(" ");

  // should have exactly 2 parts separated by a space character
  if (parts.length !== 2) {
    return false;
  }

  const [outward, inward] = parts;

  // all formats end with 9AA
  const inwardRegex = /^[0-9][A-Z]{2}$/;
  if (!inwardRegex.test(inward)) {
    return false;
  }

  const outwardRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?$/;
  if (!outwardRegex.test(outward)) {
    return false;
  }

  return true;
}

// Helpers

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
