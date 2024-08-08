const {incomeTestedCalc} = require('kc983po')


// Example usage
// Supplement Equivalent (SE)
const SE = 906.73; // Example values, replace with actual values. "Aggregate maximum supplement"
// Top-Up (TU)
const TU = 166.20;
// Pension Equivalent (PE)
const PE = 718.33;
// OAS and International Years
const YEARS = 40
// Client age
const AGE = 64

console.log(incomeTestedCalc({TABLE: "5ALWS",SE, TU, PE, INC: 1000, YEARS, AGE}))

// runApi()