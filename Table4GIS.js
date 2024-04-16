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
  const MJI4K = min0((INC - 4000) / 24);


  // Step 3: Apply SQF to System Values
  const QSE = SQF * SE;
  const QPE = SQF * PE;
  const QTU = SQF * TU;
  const QRPE = RPE * SQF;

  // // Calculate 3/4 Monthly Joint Income (MJI3/4)
  // const MJI34 = min0((3 / 4) * roundDown(MJI, 4));

  // Calculate Residual Joint Income (RJI)
  const RJI = min0(MJI - roundUp((4 / 3) * QRPE, 4));
  const RJIA = RJI / 4

  // Calculate Base Summplement (BS)
  const BS = ((SE + FMP - YOAS) * SQF) - RJIA

  // Calculate Modified Top-Up (MTU)
  const MTU = QTU - roundDown(MJI4K, 4)

  // Calculate Income-Adjusted Top-Up (IATU)
  const GIS = BS + MTU + FMP

  // let ALW;

  // // Step 7: Calculate Total Allowance (ALW) based on INC
  // if (INC === 0) {
  //   ALW = QPE + QSE + QTU;
  // } else if (MJI <= PRODUCT) {
  //   ALW = QSE + (QPE - MJI34) + IATU;
  // } else {
  //   ALW = QSE - roundDown(RJI, 4) / 4 + IATU;
  // }

  return GIS.toFixed(2);
}

// Example usage
// Supplement Equivalent (SE)
const SE = 594.59; // Example values, replace with actual values
// Top-Up (TU)
const TU = 46.76;
// Pension Equivalent (PE)
const PE = 713.34;
// Joint Income (INC)
const INC = 11000;
// OAS and International Years
const YEARS = 40
// Client age
const AGE = 65

console.log("=======================================");
console.log(0, calculateTable4GIS(SE, TU, PE, 0, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
console.log(100, calculateTable4GIS(SE, TU, PE, 100, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
console.log(1000, calculateTable4GIS(SE, TU, PE, 1000, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
console.log(2500, calculateTable4GIS(SE, TU, PE, 2500, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
console.log(5000, calculateTable4GIS(SE, TU, PE, 5000, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
console.log(10000, calculateTable4GIS(SE, TU, PE, 10000, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
console.log(15000, calculateTable4GIS(SE, TU, PE, 15000, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
console.log(17500, calculateTable4GIS(SE, TU, PE, 17500, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
console.log(20000, calculateTable4GIS(SE, TU, PE, 20000, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
console.log(25000, calculateTable4GIS(SE, TU, PE, 25000, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
console.log(30000, calculateTable4GIS(SE, TU, PE, 30000, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
console.log(35000, calculateTable4GIS(SE, TU, PE, 35000, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);
console.log(40000, calculateTable4GIS(SE, TU, PE, 40000, YEARS, YEARS, AGE), ":", 1354.69, ":", 1426.02);