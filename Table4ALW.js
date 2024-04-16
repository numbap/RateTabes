const { roundUp, roundDown, min0 } = require("./utils.js");

function calculateAllowance(SE, TU, PE, INC, IYEARS = 10, DATE = "2024-04-01") {
  //////////////////////////////////////////////////////////////////
  // This function is accurate for rates from 04-01-2024 and beyond
  // Cannot handle retroactive rate calculations
  // Cannot handle International Operations calculations
  //////////////////////////////////////////////////////////////////
  // Supplement Equivalent (SE)
  // Top-Up (TU)
  // Pension Equivalent (PE)
  // Joint Income (INC)
 // IO Years (IYEARS)
  // Date to be used in future iterations for retroactive calculations

  // Calculate Special Qualifying Factor (SQF)
  const SQF = Math.min(1, IYEARS/10);

  // Calculate Monthly Joint Income (MJI) and MJI over $4000 (MJI4K)
  const MJI = min0(INC / 12);
  const MJI4K = min0((INC - 4000) / 12);

  // Step 3: Apply SQF to System Values
  const QSE = SQF * SE;
  const QPE = SQF * PE;
  const QTU = SQF * TU;
  const QRPE = roundUp(PE, 3) * SQF;
  const PRODUCT = (4 / 3) * QRPE;

  // Calculate 3/4 Monthly Joint Income (MJI3/4)
  const MJI34 = min0((3 / 4) * roundDown(MJI, 4));

  // Calculate Residual Joint Income (RJI)
  const RJI = MJI - roundUp((4 / 3) * QRPE, 4);

  // Calculate Income-Adjusted Top-Up (IATU)
  const IATU = min0(QTU - roundDown(MJI4K / 2, 4) / 4);

  let ALW;

  // Step 7: Calculate Total Allowance (ALW) based on INC
  if (INC === 0) {
    ALW = QPE + QSE + QTU;
  } else if (MJI <= PRODUCT) {
    ALW = QSE + (QPE - MJI34) + IATU;
  } else {
    ALW = QSE - roundDown(RJI, 4) / 4 + IATU;
  }

  return ALW.toFixed(2);
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

const allowance = calculateAllowance(SE, TU, PE, INC);
console.log("=======================================");
console.log(0, calculateAllowance(SE, TU, PE, 0), ":", 1354.69);
console.log(100, calculateAllowance(SE, TU, PE, 100), ":", 1348.69);
console.log(1000, calculateAllowance(SE, TU, PE, 1000), ":", 1294.69);
console.log(2500, calculateAllowance(SE, TU, PE, 2500), ":", 1198.69);
console.log(5000, calculateAllowance(SE, TU, PE, 5000), ":", 1032.69);
console.log(8000, calculateAllowance(SE, TU, PE, 8000), ":", 815.69);
console.log(10000, calculateAllowance(SE, TU, PE, 10000), ":", 683.93);
console.log(12000, calculateAllowance(SE, TU, PE, 12000), ":", 582.59);
console.log(15000, calculateAllowance(SE, TU, PE, 15000), ":", 520.59);
console.log(17500, calculateAllowance(SE, TU, PE, 17500), ":", 468.59);
console.log(20000, calculateAllowance(SE, TU, PE, 20000), ":", 416.59);
console.log(25000, calculateAllowance(SE, TU, PE, 25000), ":", 312.59);
console.log(30000, calculateAllowance(SE, TU, PE, 30000), ":", 207.69);
