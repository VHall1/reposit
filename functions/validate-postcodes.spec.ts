import { InMemoryPropertyStore, type PropertyStore } from "../store";
import { PropertySchema } from "../types";
import { readFromCSV } from "../util/csv";
import { isPostcodeValid, validatePostcodes } from "./validate-postcodes";

describe("validatePostcodes", () => {
  let propertyStore: PropertyStore;

  beforeAll(async () => {
    const properties = await readFromCSV(
      "data/technical-challenge-properties-september-2024.csv",
      PropertySchema
    );
    propertyStore = new InMemoryPropertyStore(properties);
  });

  test("lists properties with invalid postcodes", () => {
    const invalid = validatePostcodes(propertyStore);
    expect(invalid).toEqual(["p_1025", "p_1080", "p_1100"]);
  });
});

describe("isPostcodeValid", () => {
  test.each([
    { desc: "AA9 9AA", postcode: "CR2 6XH" },
    { desc: "AA99 9AA", postcode: "DN55 1PT" },
    { desc: "A9 9AA", postcode: "M1 1AE" },
    { desc: "A99 9AA", postcode: "B33 8TH" },
    { desc: "A9A 9AA", postcode: "W1A 0AX" },
    { desc: "AA9A 9AA", postcode: "EC1A 1BB" },
  ])("handles valid $desc postcode format", ({ postcode }) => {
    expect(isPostcodeValid(postcode)).toBe(true);
  });

  test("handles valid postcode with mixed casing", () => {
    expect(isPostcodeValid("ec1a 1BB")).toBe(true);
  });

  test("handles invalid postcode", () => {
    expect(isPostcodeValid("M60 1W")).toBe(false);
  });
});
