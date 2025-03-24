# Reposit Take-home Challenge

## Requirements

- Node.js: v20 or later
  - [Download](https://nodejs.org/en/download/)

## Project Structure

| Folder        | Description                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| **data**      | Sample CSV data provided.                                                                                  |
| **functions** | Actual logic implementing the challenge requirements. Each function has an associated test file.           |
| **store**     | Access data, exports both the store interface and concrete implementations, used for dependency injection. |
| **util**      | Utility functions used across the project, namely where the CSV handling implementation is kept.           |

## Getting Started

As mentioned in the challenge guidelines, no user interface or API have been implemented for the functions in `functions/`,
however, every function has been tested with jest. You may run the following command to run those tests:

```bash
npm run test
```

alternatively, the following should also work:

```bash
npm t
```

## Design Choices & Trade-offs

- **Money Calculations**: As rent values are provided in pence rather than pounds, this simplifies calculations and avoids precision issues with floating-point arithmetic.
  Since fractional pennies are unlikely to be relevant, the current implementation floors any returned values derived from rent calculations.

- **Postcode Validation**: The regex used to validate postcodes currently only checks if it follows the general validation rules, but does not check if the postcode actually exists,
  as this would require a more complex regex pattern, which would be hard to test and maintain.

- **Reading CSV files**: For simplicity, the helper function reads the entire CSV file and returns its contents as an array. This method is sufficient for the small sample files provided.
  However, for real-world data with hundreds of thousands of rows, alternative approaches like batching or streaming may be necessary to improve performance.
