const {incomeTestedCalc} = require('kc983po')


// Example usage
// Supplement Equivalent (SE)
const SE = 900.43; // Example values, replace with actual values. "Aggregate maximum supplement"
// Top-Up (TU)
const TU = 165.04;
// Pension Equivalent (PE)
const PE = 713.34;
// OAS and International Years
const YEARS = 40
// Client age
const AGE = 65

console.log(incomeTestedCalc({TABLE: "3GIS",SE, TU, PE, INC: 1000, YEARS, AGE}))

// runApi()