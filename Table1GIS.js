const { roundUp, roundDown, min0 } = require("./utils.js");

function calculateTable1GIS(SE, TU, PE, INC, YEARS, IYEARS = 10, AGE, DATE = "2024-04-01", addOAS = false) {
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
  const MBIA = Math.floor(INC / 24);
  const MBI4K = Math.floor(min0(INC - 2000) / 48);

  // Calculate Base Summplement (BS)
  const BS = ((SE + PE - YOAS) * SQF) - MBIA

  // Calculate Modified Top-Up (MTU)
  const MTU = min0((TU * SQF) - MBI4K)

  // By default, this only returns GIS. However we can add the FMP for testing purposes
  const GIS = addOAS ? BS + MTU + FMP : BS + MTU;


  return GIS.toFixed(2);
}

// Example usage
// Supplement Equivalent (SE)
const SE = 900.43; // Example values, replace with actual values
// Top-Up (TU)
const TU = 165.04;
// Pension Equivalent (PE)
const PE = 713.34;
// OAS and International Years
const YEARS = 40
// Client age
const AGE = 65

module.exports = { calculateTable1GIS };

