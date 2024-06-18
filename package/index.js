const {calculateTable1GIS} = require("./Table1GIS")
const {calculateTable2GIS} = require("./Table2GIS")
const {calculateTable3GIS} = require("./Table3GIS")
const {calculateTable4GIS} = require("./Table4GIS")
const {calculateTable4ALW} = require("./Table4ALW")
const {calculateTable5ALWS} = require("./Table5ALWS")


function testMessage(){
    console.log("Package is working")
}

function incomeTestedCalc(input){
    const {TABLE, SE, TU, PE, INC, YEARS, IYEARS, AGE, DATE, addOAS} = input

    switch (TABLE) {
        case '1GIS':
            console.log("Table 1 Calculation");
            return calculateTable1GIS(SE, TU, PE, INC, YEARS, IYEARS, AGE, DATE, addOAS);
        case '2GIS':
            console.log("Table 1 Calculation");
            return calculateTable2GIS(SE, TU, PE, INC, YEARS, IYEARS, AGE, DATE, addOAS);

        case '3GIS':
            console.log("Table 1 Calculation");
            return calculateTable3GIS(SE, TU, PE, INC, YEARS, IYEARS, AGE, DATE, addOAS);

        case '4GIS':
            console.log("Table 1 Calculation");
            return calculateTable4GIS(SE, TU, PE, INC, YEARS, IYEARS, AGE, DATE);

        case '4ALW':
            console.log("Table 1 Calculation");
            return calculateTable4ALW(SE, TU, PE, INC, IYEARS, DATE);

        case '5ALWS':
            console.log("Table 1 Calculation");
            return calculateTable5ALWS(SE, TU, PE, INC, IYEARS, DATE);
        default:
            console.log("No Rate Table Specified");
            return 0
    }
}

module.exports = {incomeTestedCalc, testMessage};