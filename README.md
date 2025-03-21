# Reposit Take-home Challenge

## Requirements

- Node.js: v20 or later
  - [Download](https://nodejs.org/en/download/)

## Trade-offs

- **Reading CSV files**: For the sake of simplicity, the helper function used to load CSV files will read the entire file and return it as an array.
This should be good enough to handle the small sample files provided, however, if used on real-world data, where we might have hundreds of thousands of rows,
it might be beneficial to consider other approaches, such as batching reads or streaming the file, rather than waiting for the whole thing to be read before processing.