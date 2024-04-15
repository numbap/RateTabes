function calculateAllowance(SE, TU, PE, INC, YEARS = 10, DATE = "2024-04-01") {
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

  // Calculate Special Qualifying Factor (SQF)
  const SQF = Math.max(1, YEARS > 10 ? (YEARS - 10) / 10 : 1);

  // Calculate Monthly Joint Income (MJI) and MJI over $4000 (MJI4K)
  const MJI = Math.max(INC / 12, 0);
  const MJI4K = Math.max(0, (INC - 4000) / 12);

  // Step 3: Apply SQF to System Values
  const QSE = SQF * SE;
  const QPE = SQF * PE;
  const QTU = SQF * TU;
  const QRPE = Math.ceil(PE / 3) * 3 * SQF;
  const PRODUCT = (4 / 3) * QRPE;

  // Calculate 3/4 Monthly Joint Income (MJI3/4)
  //   const MJI34 = Math.max(0, Math.floor(MJI / 4) * 3);
  const MJI34 = Math.max((3 / 4) * Math.floor(MJI / 4) * 4, 0);

  // Calculate Residual Joint Income (RJI)
  const RJI = MJI - Math.max(Math.ceil(((4 / 3) * QRPE) / 4) * 4, 0);

  // Calculate Income-Adjusted Top-Up (IATU)
  const IATU = Math.max(0, QTU - Math.floor(MJI4K / 2 / 4) * 4);

  let ALW;

  console.log("----", MJI, PRODUCT);

  // Step 7: Calculate Total Allowance (ALW) based on INC
  if (INC === 0) {
    ALW = QPE + QSE + QTU;
    // MJI, not income as per document!!!!!
  } else if (INC <= PRODUCT) {
    ALW = QSE + (QPE - MJI34) + QTU;
  } else {
    ALW = QSE - RJI / 4 + QTU;
  }

  return ALW;
}

// Example usage
// Supplement Equivalent (SE)
const SE = 594.59; // Example values, replace with actual values
// Top-Up (TU)
const TU = 46.76;
// Pension Equivalent (PE)
const PE = 713.34;
// Joint Income (INC)
const INC = 10000;

const allowance = calculateAllowance(SE, TU, PE, INC);
console.log("Allowance: ", allowance);
