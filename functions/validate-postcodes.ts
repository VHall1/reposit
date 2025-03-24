import type { Property } from "../types";

export const validatePostcodes = (properties: Property[]): string[] => {
  const invalid = [];

  for (const property of properties) {
    if (!isPostcodeValid(property.postcode)) {
      invalid.push(property.id);
    }
  }

  return invalid;
};

// regex patterns for UK postcodes
const INWARD_REGEX = /^[0-9][A-Z]{2}$/i; // e.g. "9AA"
const OUTWARD_REGEX = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?$/i; // e.g. "SW1A", "M1", "B33"

export const isPostcodeValid = (postcode: string): boolean => {
  const parts = postcode.split(" ");

  // should have exactly 2 parts separated by a space character
  if (parts.length !== 2) {
    return false;
  }

  const [outward, inward] = parts;

  if (!INWARD_REGEX.test(inward)) {
    return false;
  }

  if (!OUTWARD_REGEX.test(outward)) {
    return false;
  }

  return true;
};
