const fs = require('fs');
const csv = require('csv-parser');
const {calculateTable1GIS} = require('./Table1GIS.js')

// Function to process each row
function processRow(row) {
  // Example: Log the contents of each row
  console.log(row);
}

// Path to the CSV file
const filePathT1 = './Q22024/table1_gis_for_single_who_receives_oas_pension_april2024.csv';

// Array to store the rows
let rows = [];


// This function loops through each row of a CSV file and runs a function on each
// To be used for rate table testing
function loopCSV(filePath, headers, callback, message) {
    // Read the CSV file and process each row
    fs.createReadStream(filePath)
    .pipe(csv({ skipLines: 3, headers })) // Skip the first 2 rows
    .on('data', (row) => {
        callback(row);
    })
    .on('end', () => {
        console.log(message);
    });
}

// Test Table 1 for all income brackets according to specific criteria
// Output responses to a text file
function table1GISTest(filePath, se, tu, pe, years, iyears, date, verbose, outputFile){
    const columnHeaders = ["income_low","income_high", "GIS", "OASGIS65", "OASGIS75"]
    const message = "Table 1 Test Complete"
    const calculate = (row) => {
        const date = new Date();
        const calculated = calculateTable1GIS(se, tu, pe, row.income_low, years, iyears, "2024-04-01")
        const output = parseFloat(calculated) === parseFloat(row.OASGIS65) ? ["T1 ", row.income_low, "passed", date] : {calculated, expected: row.OASGIS65}
        if(!(parseFloat(calculated) === parseFloat(row.OASGIS65) && verbose)){
            console.log(output)
            appendLineToFile(outputFile, JSON.stringify(output))
        }
    }
    loopCSV(filePath, columnHeaders, calculate, message)
}


function appendLineToFile(filePath, line) {
    fs.appendFile(filePath, `${line}\n`, (err) => {
      if (err) {
        console.error(`Failed to append line to file: ${err}`);
        return;
      }
      console.log('Line appended to file successfully.');
    });
  }

table1GISTest(filePathT1, 900.43, 165.04, 713.34, 40, 40, "2024-01-01", false, "./output.txt")
