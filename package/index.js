
const express = require('express');
const calculateTable1GIS = require("./Table1GIS")
const calculateTable2GIS = require("./Table2GIS")
const calculateTable3GIS = require("./Table3GIS")
const calculateTable4GIS = require("./Table4GIS")
const calculateTable4ALW = require("./Table4ALW")
const calculateTable5ALWS = require("./Table5ALWS")


function testMessage(){
    console.log("Package is working")
}

function runApi(){
    const app = express();
    const port = 3000;

    // Middleware to parse JSON bodies
    app.use(express.json());

    // Define an API endpoint for Income Tested Benefits
    app.post('/api/itb', (req, res) => {
        const { input } = req.body;
        if (!input) {
            return res.status(400).send('Input is required');
        }

        const result = incomeTestedCalc(input);
        res.send({ result });
    });
}




function incomeTestedCalc(input){
    const {TABLE, SE, TU, PE, INC, YEARS, IYEARS, AGE, DATE, addOAS} = input

    switch (TABLE) {
        case '1GIS':
            console.log("Table 1 Calculation");
            calculateTable1GIS(SE, TU, PE, INC, YEARS, IYEARS, AGE, DATE, addOAS);
            break;
        case '2GIS':
            console.log("Table 1 Calculation");
            calculateTable2GIS(SE, TU, PE, INC, YEARS, IYEARS, AGE, DATE, addOAS);
            break;
        case '3GIS':
            console.log("Table 1 Calculation");
            calculateTable3GIS(SE, TU, PE, INC, YEARS, IYEARS, AGE, DATE, addOAS);
            break;
        case '4GIS':
            console.log("Table 1 Calculation");
            calculateTable4GIS(SE, TU, PE, INC, YEARS, IYEARS, AGE, DATE);
            break;
        case '4ALW':
            console.log("Table 1 Calculation");
            calculateTable4ALW(SE, TU, PE, INC, IYEARS, DATE);
            break;
        case '5ALWS':
            console.log("Table 1 Calculation");
            calculateTable5ALWS(SE, TU, PE, INC, IYEARS, DATE);
            break;
        default:
            console.log("No Rate Table Specified");
            return 0
    }
}

module.exports = {incomeTestedCalc, runApi, testMessage};