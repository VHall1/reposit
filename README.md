# Reposit Take-home Challenge

## Requirements

- Node.js: v20 or later
  - [Download](https://nodejs.org/en/download/)

## Project Structure

| Folder        | Description                                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| **data**      | Contains sample CSV data.                                                                                       |
| **functions** | Implements the challenge requirements. Each function has an associated test file.                               |
| **store**     | Manages data access and exports both the store interface and concrete implementations for dependency injection. |
| **util**      | Houses utility functions used across the project, including CSV handling.                                       |

## Getting Started

As noted in the challenge guidelines, there is no user interface or API for the functions in the functions/ folder.
However, every function is covered by tests using jest. To run the tests, execute:

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

- **Database Integration (e.g., SQLite)**: For better optimization and scalability, a database like SQLite could be used to dump all the CSV data. This would enable the use of more efficient, indexed queries and reduce memory overhead,
  especially for large datasets. SQLite would provide better query optimization for filtering, sorting, and aggregating data compared to working directly with large arrays in memory.
  This approach would be a good consideration if the dataset grows significantly in the future.
