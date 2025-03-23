# Reposit Take-home Challenge

## Requirements

- Node.js: v20 or later
  - [Download](https://nodejs.org/en/download/)

## Implementation

Each requirement is implemented as a standalone function in the `functions/` directory, with an associated test file.
The CSV functionality is implemented in the `csv.ts` file at the top level of the project. Instead of being called directly by the functions,
it is used only in the tests. This ensures that the core functions remain agnostic to the data source and do not contain any CSV-specific logic.

## Trade-offs

- **Money Calculations**: As rent values are provided in pence rather than pounds, this simplifies calculations and avoids precision issues with floating-point arithmetic.
  Since fractional pennies are unlikely to be relevant, the current implementation floors any returned values derived from rent calculations.

- **Postcode Validation**: The regex used to validate postcodes currently only checks if it follows the general validation rules, but does not check if the postcode actually exists,
  as this would require a more complex regex pattern, which would be hard to test and maintain.

- **Reading CSV files**: For simplicity, the helper function reads the entire CSV file and returns its contents as an array. This method is sufficient for the small sample files provided.
  However, for real-world data with hundreds of thousands of rows, alternative approaches like batching or streaming may be necessary to improve performance.

- **CSV Validation**: The current implementation assumes that the CSV data conforms to the types declared in `types.ts`.
  In a production environment, additional validation would be required to handle user-provided data reliably.

- **Dependency Injection**: Currently, functions receive data as arrays passed as parameters. While this works well for one-off functions,
  a more scalable solution might involve implementing a class that reads data from a storage service, which can then be injected into the functions as needed.
