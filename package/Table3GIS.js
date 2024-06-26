const { roundUp, roundDown, min0 } = require("./utils.js");

function calculateTable3GIS(SE, TU, PE, INC, YEARS, IYEARS = 10, AGE, DATE = "2024-04-01", addOAS = false) {
  //////////////////////////////////////////////////////////////////
  // This function is accurate for rates from 04-01-2024 and beyond
  // Cannot handle retroactive rate calculations
  // Cannot handle International Operations calculations
  //////////////////////////////////////////////////////////////////
  // Supplement Equivalent - Single (SE) 
  // Top-Up - Single (TU)
  // Pension Equivalent (PE)
  // Single Income (INC)
  // IO Years (IYEARS)
  // Date to be used in future iterations for retroactive calculations

  // Calculate Special Qualifying Factor (SQF)
  const SQF = Math.min(1, IYEARS/10);

  // Calculate Full Monthly Pension
  const FMP = AGE >= 75 ? PE * 1.1 : PE

  // Calculate Years Based OAS
  const YOAS = (Math.min(YEARS, 40)/40) * PE
  const PMYBG = (SE + FMP - YOAS) * SQF // Section 12(5) Part 1 : [(A - B) * C]
  const MBI = min0((INC / 24) - (roundUp(PE * SQF, 4)/2)) // Monthly Base Income as per Section 12(6)(b)
  const INC4000 = min0(roundDown((INC-4000)/24, 4))


  const TOPUP = min0((TU * SQF) - (INC4000/4)) // Additional amount as per sections 12.1(1)
  const GIS = min0(PMYBG - roundDown(MBI, 2)/2) // Section 12(5) Part 2 : with D/2 substracted. Pensioners monthly base income rounded down to the next lower multiple of $2

  return (GIS+PE+TOPUP).toFixed(2);
}

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



// console.log("=======================================");
// console.log(0, calculateTable3GIS(SE, TU, PE, 0, YEARS, YEARS, AGE), ":", 1778.81, ":", 1850.14);
// console.log(100, calculateTable3GIS(SE, TU, PE, 100, YEARS, YEARS, AGE), ":", 1778.81, ":", 1850.14);
// console.log(1000, calculateTable3GIS(SE, TU, PE, 1000, YEARS, YEARS, AGE), ":", 1778.81, ":", 1850.14);
// console.log(5000, calculateTable3GIS(SE, TU, PE, 5000, YEARS, YEARS, AGE), ":", 1768.81, ":", 1840.14);
// console.log(10000, calculateTable3GIS(SE, TU, PE, 10000, YEARS, YEARS, AGE), ":", 1687.81, ":", 1759.14);
// console.log(20000, calculateTable3GIS(SE, TU, PE, 20000, YEARS, YEARS, AGE), ":", 1376.77, ":", 1448.10);
// console.log(30000, calculateTable3GIS(SE, TU, PE, 30000, YEARS, YEARS, AGE), ":", 1167.77, ":", 1239.10);
// console.log(40000, calculateTable3GIS(SE, TU, PE, 40000, YEARS, YEARS, AGE), ":", 959.77, ":", 1031.10);
// console.log(50000, calculateTable3GIS(SE, TU, PE, 50000, YEARS, YEARS, AGE), ":", 751.77, ":", 823.10);

module.exports = { calculateTable3GIS };