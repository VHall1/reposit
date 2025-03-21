import type { Property } from "../types";

export function validatePostcodes(properties: Property[]): string[] {
  const invalid = [];

  for (const property of properties) {
    if (!isPostcodeValid(property.postcode)) {
      invalid.push(property.id);
    }
  }

  return invalid;
}

export function isPostcodeValid(postcode: string): boolean {
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
