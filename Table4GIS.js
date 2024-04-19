const { roundUp, roundDown, min0 } = require("./utils.js");

function calculateTable4GIS(SE, TU, PE, INC, YEARS, IYEARS = 10, AGE, DATE = "2024-04-01") {
  //////////////////////////////////////////////////////////////////
  // This function is accurate for rates from 04-01-2024 and beyond
  // Cannot handle retroactive rate calculations
  // Cannot handle International Operations calculations
  //////////////////////////////////////////////////////////////////
  // Supplement Equivalent (SE)
  // Top-Up (TU)
  // Pension Equivalent (PE)
  // Joint Income (INC)
  // IO Years (YEARS)
  // Date to be used in future iterations for retroactive calculations

  // Calculate Full Monthly Pension
  const FMP = AGE >= 75 ? PE * 1.1 : PE

  // Calculate Rounded Pension Equivalent
  const RPE = roundUp(PE, 3)
  
  // Calculate Years Based OAS
  const YOAS = (Math.min(YEARS, 40)/40) * FMP

  // Calculate Special Qualifying Factor (SQF)
  const SQF = Math.min(1, IYEARS/10);

  // Calculate Monthly Joint Income (MJI) and MJI over $4000 (MJI4K)
  const MJI = min0(INC / 12);
  const MJI4K = roundDown(min0(INC - 4000) / 24, 4);

  // const QPE = SQF * PE;
  const QTU = SQF * TU;
  const QRPE = RPE * SQF;

  // Calculate Residual Joint Income (RJI)
  const RJI = min0(MJI - roundUp((4 / 3) * QRPE, 4));
  const RJIA = roundDown(RJI, 4) / 4

  // Calculate Base Summplement (BS)
  const BS = ((SE + FMP - YOAS) * SQF) - RJIA

  // Calculate Modified Top-Up (MTU)
  const MTU = min0(QTU - MJI4K / 4)

  // Calculate Income-Adjusted Top-Up (IATU)
  const GIS = BS + MTU + FMP

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

// console.log("=======================================");
// console.log(0, calculateTable4GIS(SE, TU, PE, 0, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
// console.log(100, calculateTable4GIS(SE, TU, PE, 100, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
// console.log(1000, calculateTable4GIS(SE, TU, PE, 1000, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
// console.log(2500, calculateTable4GIS(SE, TU, PE, 2500, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
// console.log(5000, calculateTable4GIS(SE, TU, PE, 5000, YEARS, YEARS, AGE), ":", 1344.69, ":", 1416.02);
// console.log(10000, calculateTable4GIS(SE, TU, PE, 10000, YEARS, YEARS, AGE), ":", 1307.93, ":", 1379.26);
// console.log(15000, calculateTable4GIS(SE, TU, PE, 15000, YEARS, YEARS, AGE), ":", 1233.93, ":", 1305.26);
// console.log(17500, calculateTable4GIS(SE, TU, PE, 17500, YEARS, YEARS, AGE), ":", 1183.93, ":", 1253.26);
// console.log(20000, calculateTable4GIS(SE, TU, PE, 20000, YEARS, YEARS, AGE), ":", 1129.93, ":", 1201.26);
// console.log(25000, calculateTable4GIS(SE, TU, PE, 25000, YEARS, YEARS, AGE), ":", 1025.93, ":", 1097.26);
// console.log(30000, calculateTable4GIS(SE, TU, PE, 30000, YEARS, YEARS, AGE), ":", 960.18, ":", 1031.51);
// console.log(35000, calculateTable4GIS(SE, TU, PE, 35000, YEARS, YEARS, AGE), ":", 960.18, ":", 1031.51);
// console.log(40000, calculateTable4GIS(SE, TU, PE, 40000, YEARS, YEARS, AGE), ":", 960.18, ":", 1031.51);

module.exports = { calculateTable4GIS };