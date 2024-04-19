const fs = require("fs");
const csv = require("csv-parser");
const { calculateTable1GIS } = require("./Table1GIS.js");
const { calculateTable2GIS } = require("./Table2GIS.js");
const { calculateTable3GIS } = require("./Table3GIS.js");
const { calculateTable4GIS } = require("./Table4GIS.js");
const { calculateOAS } = require("./OAS.js");


// Function to process each row
function processRow(row) {
  // Example: Log the contents of each row
  console.log(row);
}

// Path to the CSV file
const filePathT1 =
  "./Q22024/table1_gis_for_single_who_receives_oas_pension_april2024.csv";
const filePathT2 =
  "./Q22024/table2_gis_for_spouse_of_someone_receiving_oas_pension_april2024.csv";
const filePathT3 =
  "./Q22024/table3_gis_for_spouse_of_someone_who_does_not_receive_oas_pension_april2024.csv";
const filePathT4 = "./Q22024/table4_gis_and_allowance_for_couple_april2024.csv";
const filePathOAS = "./Q22024/OAS_April2024.csv";

// Array to store the rows
let rows = [];

// This function loops through each row of a CSV file and runs a function on each
// To be used for rate table testing
function loopCSV(filePath, headers, callback, message) {
  // Read the CSV file and process each row
  fs.createReadStream(filePath)
    .pipe(csv({ skipLines: 3, headers })) // Skip the first 2 rows
    .on("data", (row) => {
      callback(row);ß
    })
    .on("end", () => {
      console.log(message);
    });
}

function appendLineToFile(filePath, line) {
  fs.appendFile(filePath, `${line}\n`, (err) => {
    if (err) {
      console.error(`Failed to append line to file: ${err}`);
      return;
    }
    console.log("Line appended to file successfully.");
  });
}

// Test Table 1 for all income brackets according to specific criteria
// Output responses to a text file
function table1GISTest(
  filePath,
  se,
  tu,
  pe,
  years,
  iyears,
  age,
  date,
  verbose,
  outputFile
) {
  const columnHeaders = [
    "income_low",
    "income_high",
    "GIS",
    "OASGIS65",
    "OASGIS75",
  ];
  const startMessage = `Table 1 Test Start - ${age}`;
  appendLineToFile(outputFile, startMessage);
  const calculate = (row) => {
    const date = new Date();
    const calculated = calculateTable1GIS(
      se,
      tu,
      pe,
      row.income_low,
      years,
      iyears,
      age,
      "2024-04-01",
      true
    );
    const output =
      parseFloat(calculated) === parseFloat(row.OASGIS65)
        ? ["T1 ", row.income_low, "passed", date]
        : { calculated, expected: row.OASGIS65 };
    if (
      !(
        parseFloat(calculated) ===
          parseFloat(age === 65 ? row.OASGIS65 : row.OASGIS75) && !verbose
      )
    ) {
      console.log(output);
      appendLineToFile(outputFile, JSON.stringify(output));
    }
  };
  loopCSV(filePath, columnHeaders, calculate, "Table 1 testing complete");
}

// Test Table 2 for all income brackets according to specific criteria
// Output responses to a text file
function table2GISTest(
  filePath,
  se,
  tu,
  pe,
  years,
  iyears,
  age,
  date,
  verbose,
  outputFile
) {
  const columnHeaders = [
    "income_low",
    "income_high",
    "GIS",
    "OASGIS65",
    "OASGIS75",
  ];
  const startMessage = `Table 2 Test Start - ${age}`;
  appendLineToFile(outputFile, startMessage);
  const calculate = (row) => {
    const date = new Date();
    const calculated = calculateTable2GIS(
      se,
      tu,
      pe,
      row.income_low,
      years,
      iyears,
      age,
      "2024-04-01",
      true
    );
    const output =
      parseFloat(calculated) === parseFloat(row.OASGIS65)
        ? ["T2 ", row.income_low, "passed", date]
        : { calculated, expected: row.OASGIS65 };
    if (
      !(
        parseFloat(calculated) ===
          parseFloat(age === 65 ? row.OASGIS65 : row.OASGIS75) && !verbose
      )
    ) {
      console.log(output);
      appendLineToFile(outputFile, JSON.stringify(output));
    }
  };
  loopCSV(filePath, columnHeaders, calculate, "Table 2 testing complete");
}

// Test Table 3 for all income brackets according to specific criteria
// Output responses to a text file
function table3GISTest(
  filePath,
  se,
  tu,
  pe,
  years,
  iyears,
  age,
  date,
  verbose,
  outputFile
) {
  const columnHeaders = [
    "income_low",
    "income_high",
    "GIS",
    "OASGIS65",
    "OASGIS75",
    "ALLOWANCE",
  ];
  const startMessage = `Table 3 Test Start - ${age}`;
  appendLineToFile(outputFile, startMessage);
  const calculate = (row) => {
    const date = new Date();
    const calculated = calculateTable3GIS(
      se,
      tu,
      pe,
      row.income_low,
      years,
      iyears,
      age,
      "2024-04-01",
      true
    );
    const output =
      parseFloat(calculated) === parseFloat(row.OASGIS65)
        ? ["T3 ", row.income_low, "passed", date]
        : { calculated, expected: row.OASGIS65 };
    if (
      !(
        parseFloat(calculated) ===
          parseFloat(age === 65 ? row.OASGIS65 : row.OASGIS75) && !verbose
      )
    ) {
      console.log(output);
      appendLineToFile(outputFile, JSON.stringify(output));
    }
  };
  loopCSV(filePath, columnHeaders, calculate, "Table 3 testing complete");
}

// Test Table 4 for all income brackets according to specific criteria
// Output responses to a text file
function table4GISTest(
  filePath,
  se,
  tu,
  pe,
  years,
  iyears,
  age,
  date,
  verbose,
  outputFile
) {
  const columnHeaders = [
    "income_low",
    "income_high",
    "GIS",
    "OASGIS65",
    "OASGIS75",
  ];
  const startMessage = `Table 4 Test Start - ${age}`;
  appendLineToFile(outputFile, startMessage);
  const calculate = (row) => {
    const date = new Date();
    const calculated = calculateTable4GIS(
      se,
      tu,
      pe,
      row.income_low,
      years,
      iyears,
      age,
      "2024-04-01",
      true
    );
    const output =
      parseFloat(calculated) === parseFloat(row.OASGIS65)
        ? ["T4 ", row.income_low, "passed", date]
        : { calculated, expected: row.OASGIS65 };
    if (
      !(
        parseFloat(calculated) ===
          parseFloat(age === 65 ? row.OASGIS65 : row.OASGIS75) && !verbose
      )
    ) {
      console.log(output);
      appendLineToFile(outputFile, JSON.stringify(output));
    }
  };
  loopCSV(filePath, columnHeaders, calculate, "Table 4 testing complete");
}

// Test OAS scenarios excluding ISSA
// Output responses to a text file
// This needs to cycle through an array of deferral months and an array of OAS years.
function oasTest(filePath, pe, years, age, defer, date, verbose, outputFile) {
  const columnHeaders = ["YEARS", "DEFERRAL", "AGE", "SQF", "AMOUNT"];
  const startMessage = `OAS Test Start`;
  appendLineToFile(outputFile, startMessage);
  const calculate = (row) => {
    const date = new Date();
    const calculated = calculateOAS(pe, years, age, defer, "2024-04-01", true);
    const output =
      parseFloat(calculated) === parseFloat(row.AMOUNT)
        ? ["OAS ", row.YEARS, row.DEFERRAL, row.AGE, "passed", date]
        : { calculated, expected: row.AMOUNT };
    if (
      !(
        parseFloat(calculated) ===
          parseFloat(age === 65 ? row.OASGIS65 : row.OASGIS75) && !verbose
      )
    ) {
      console.log(output);
      appendLineToFile(outputFile, JSON.stringify(output));
    }
  };
  loopCSV(filePath, columnHeaders, calculate, "Table 4 testing complete");
}

// Test Table 1 for age 65
// table1GISTest(filePathT1, 900.43, 165.04, 713.34, 40, 40, 65, "2024-01-01", true, "./TEST/output1_65.txt") // Passed
// Test Table 1 for age 75
// table1GISTest(filePathT1, 900.43, 165.04, 713.34, 40, 40, 75, "2024-01-01", true, "./TEST/output1_75.txt") // Passed

// Test Table 2 for age 65
// table2GISTest(filePathT2, 594.59, 46.76, 713.34, 40, 40, 65, "2024-01-01", true, "./TEST/output2_65.txt") // Passed
// Test Table 2 for age 75
// table2GISTest(filePathT2, 594.59, 46.76, 713.34, 40, 40, 75, "2024-01-01", true, "./TEST/output2_75.txt") // Passed

// // Test Table 3 for age 65
// table3GISTest(filePathT3, 594.59, 46.76, 713.34, 40, 40, 65, "2024-01-01", true, "./TEST/output3_65.txt")
// // Test Table 3 for age 75
// table3GISTest(filePathT3, 594.59, 46.76, 713.34, 40, 40, 75, "2024-01-01", true, "./TEST/output3_75.txt")

// // Test Table 4 for age 65
table4GISTest(
  filePathT4,
  594.59,
  46.76,
  713.34,
  40,
  40,
  65,
  "2024-01-01",
  true,
  "./TEST/output4_65.txt"
); // Breaks down at 958.93
// // Test Table 4 for age 75
table4GISTest(
  filePathT4,
  594.59,
  46.76,
  713.34,
  40,
  40,
  75,
  "2024-01-01",
  true,
  "./TEST/output4_75.txt"
); // Breaks down at 958.93

// Should only verbose on incorrect answers

oasTest(filePathOAS, 713.34, years, age, defer, date, verbose, outputFile);
