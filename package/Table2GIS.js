const { roundUp, roundDown, min0 } = require("./utils.js");

function calculateTable2GIS(SE, TU, PE, INC, YEARS, IYEARS = 10, AGE, DATE = "2024-04-01", addOAS = false) {
  //////////////////////////////////////////////////////////////////
  // This function is accurate for rates from 04-01-2024 and beyond
  // Cannot handle retroactive rate calculations
  // Cannot handle International Operations calculations
  //////////////////////////////////////////////////////////////////
  // Supplement Equivalent - Married (SE)
  // This is the maximum GIS rate for a pensioner married to another pensioner, not including the top-up         as provided for under s.12 of the OAS Act
  //
  // Top-Up - Married (TU)
  // This is the maximum Top-Up rate for a pensioner married to another pensioner as provided for under ss. 12.1(2) of the OAS Act.
  //
  // Pension Equivalent (PE)
  // This is the maximum OAS rate, i.e. 40/40ths
  //
  // Joint Income (INC)
  // Each member of a couple has their individual income determined as though they were single, i.e. their own net income under the Income Tax Act, subject to allowable deductions under “income” in s.2 of the OAS Act, and then their single incomes added together.
  //
  // IO Years (IYEARS)
  // This is the person’s number of full years in Canada at the time of the payment months being calculated.
  // Date to be used in future iterations for retroactive calculations
  //
  // Calculate Special Qualifying Factor (SQF)
  //This fraction is the number of years of Canadian residence over 10 to a maximum of 10 years. This number is usually 1 unless the person isa recent immigrant. Definition of SQF found in s.2 of OAS Act.
  const SQF = Math.min(1, IYEARS/10);
  
  // Calculate Full Monthly Pension
  // This is the maximum OAS Rate, i.e. 40/40ths. If person over 75, max OAS rate is 10% higher than age 65 rate per s.7 of OAS Act.
  const FMP = AGE >= 75 ? PE * 1.1 : PE
  
  // Calculate Years Based OAS
  //This is the actual OAS rate the person is entitled to, whether a full pension or a partial rate determined under s.3 of the OAS Act.
  const YOAS = (Math.min(YEARS, 40)/40) * FMP
  
  // // Calculate Monthly Joint Income (MJI) and MJI over $4000 (MJI4K)
  // This part of the GIS calculation formula takes the couple’s joint income divided by 24 to get the monthly base income and then divides it by 2. This is the 50% reduction rate, meaning the max GIS is reduced by $1 for every $2 of joint income.
  const MBIA = Math.floor((INC / 24)/ 2);
  
  //This is the income part of the top-up formula where the first $4000 is subtracted from the couple’s joint income, which is then divided by 24 for the monthly base income and then divided by 4. Again, related to reductions rates.
  const MBI4K = Math.floor(min0((INC - 4000) / 24) /4) ;
  
  // Calculate Base Supplement (BS)
  //This is the GIS formula set out under subsection 12(5) of the OAS Act
  //(Max GIS rate (without top-up) + Max OAS rate – pensioners actual OAS monthly rate) x Special Qualifying Factor – pensioner’s monthly base income /2
  const BS = min0((SE + FMP - YOAS) * SQF) - MBIA
  
  // Calculate Modified Top-Up (MTU)
  // This is the GIS top-up formula set out under subsection 12.1(2) of the OAS Act
  // Max married top-up rate x Special Qualifying Factor less the income reduction
  const MTU = min0((TU * SQF) - MBI4K)
 
  // By default, this only returns GIS. However we can add the FMP for testing purposes
  const GIS = addOAS ? BS + MTU + FMP : BS + MTU +FMP - PE;
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
 const AGE = 75
 // Add OAS for debugging
 const ADDOAS = true

module.exports = { calculateTable2GIS };