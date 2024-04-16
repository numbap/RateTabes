const { roundUp, roundDown, min0 } = require("./utils.js");

function calculateGIS(SE, TU, PE, INC, YEARS, IYEARS = 10, AGE, DATE = "2024-04-01") {
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
  const YOAS = (Math.min(YEARS, 40)/40) * FMP

  // // Calculate Monthly Joint Income (MJI) and MJI over $4000 (MJI4K)
  const MBIA = Math.floor(INC / 48);
  const MBI4K = Math.floor(min0(INC - 4000) / 48);

  // Calculate Base Summplement (BS)
  const BS = min0(((SE + FMP - YOAS) * SQF) - MBIA)

  // Calculate Modified Top-Up (MTU)
  const MTU = min0((TU * SQF) - MBI4K)

  const GIS = BS + MTU + FMP;


  return GIS.toFixed(2);
}

// Example usage
// Supplement Equivalent (SE)
const SE = 594.59; // Example values, replace with actual values
// Top-Up (TU)
const TU = 46.76;
// Pension Equivalent (PE)
const PE = 713.34;
// OAS and International Years
const YEARS = 40
// Client age
const AGE = 65


console.log("=======================================");
console.log(0, calculateGIS(SE, TU, PE, 0, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
console.log(100, calculateGIS(SE, TU, PE, 100, YEARS, YEARS, AGE), ":", 1352.69, ":", 1424.02);
console.log(1000, calculateGIS(SE, TU, PE, 1000, YEARS, YEARS, AGE), ":", 1334.69, ":", 1406.02);
console.log(2500, calculateGIS(SE, TU, PE, 2500, YEARS, YEARS, AGE), ":", 1302.69, ":", 1374.02);
console.log(5000, calculateGIS(SE, TU, PE, 5000, YEARS, YEARS, AGE), ":", 1240.69, ":", 1312.02);
console.log(8000, calculateGIS(SE, TU, PE, 8000, YEARS, YEARS, AGE), ":", 1147.69, ":", 1219.02);
console.log(10000, calculateGIS(SE, TU, PE, 10000, YEARS, YEARS, AGE), ":", 1099.93, ":", 1171.26);
console.log(12000, calculateGIS(SE, TU, PE, 12000, YEARS, YEARS, AGE), ":", 1057.93, ":", 1129.26);
console.log(15000, calculateGIS(SE, TU, PE, 15000, YEARS, YEARS, AGE), ":", 995.93, ":", 1067.26);
console.log(20000, calculateGIS(SE, TU, PE, 20000, YEARS, YEARS, AGE), ":", 891.93, ":", 963.26);
console.log(25000, calculateGIS(SE, TU, PE, 25000, YEARS, YEARS, AGE), ":", 787.93, ":", 859.26);
console.log(30000, calculateGIS(SE, TU, PE, 30000, YEARS, YEARS, AGE), ":", 713.34, ":", 713.34*1.1);