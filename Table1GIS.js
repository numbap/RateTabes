const { roundUp, roundDown, min0 } = require("./utils.js");

function calculateTable1GIS(SE, TU, PE, INC, YEARS, IYEARS = 10, AGE, DATE = "2024-04-01", addOAS = false) {
  //////////////////////////////////////////////////////////////////
  // This function is accurate for rates from 04-01-2024 and beyond
  // Cannot handle retroactive rate calculations
  // Cannot handle International Operations calculations
  //////////////////////////////////////////////////////////////////
  // Supplement Equivalent - Single (SE) 
  // This is the maximum GIS rate for a single person, not including the top-up, as provided for under s.12 of the OAS Act
  //
  // Top-Up - Single (TU)
  // This is the maximum Top-Up rate for a single person as provided for under s.12.1 of the OAS Act
  //
  // Pension Equivalent (PE)
  // This is the maximum OAS rate i.e.40/40ths
  // 
  // Single Income (INC)
  // A single person's net income under the Income Tax Act, subject to allowable deductions under "income" in s.2 of the OAS Act
  //
  // IO Years (IYEARS)	
  // This is the person's number of full years in Canada at the time of the payment months being calculated
  // Date to be used in future iterations for retroactive calculations
  //
  // Calculate Special Qualifying Factor (SQF) 
  // This fraction is the number of years of Canadian residence over 10 to a maximum of 10 years. This number is usually 1 unless the person is a recent immigrant, i.e less than 10 yrs of Cdn residence
  // Definition of SQF found in section 2 of OAS Act
  const SQF = Math.min(1, IYEARS/10);		

  // Calculate Full Monthly Pension
  // This is the maximum OAS rate, i.e. 40/40ths. If person over 75, max OAS rate is 10% higher than age 65 rate per s.7 of OAS Act
  const FMP = AGE >= 75 ? PE * 1.1 : PE 

  // Calculate Years Based OAS
  // This is the actual OAS rate the person is entitled to, whether a full pension or a partial rate determined under s.3 of OAS Act
  const YOAS = (Math.min(YEARS, 40)/40) * FMP	

  // Calculate Monthly Base Income (MBI) and MBI over $2000 (MBI2K)
  // This part of the GIS calculation formula takes the pensioner's annual  income divided by 12 to get the monthly base income and then divides it by 2. This is the 50% reduction rate, meaning the max GIS is reduced by $1 for every $2 of income.
  const MBIA = Math.floor((INC /12) / 2);	
  // This is income part of the top-up formula where the first $2000 is subtracted from the pensioner's annual income which is then divided by 12 for the monthly base income and then divided by 4. Again, related to reductions rates.
  const MBI2K = Math.floor(min0((INC - 2000) / 12) / 4); 

  // Calculate Base Supplement (BS)	
  // This is the GIS formula set out under subsection 12(5) of the OAS Act
  // (Max GIS rate (without top-up) + Max OAS rate - pensioners actual OAS monthly rate) x Special Qualifying Factor - pensioner's monthly base income/2
  const BS = ((SE + PE - YOAS) * SQF) - MBIA           

  // Calculate Modified Top-Up (MTU) 
  // This is the GIS top-up formula set out under subsection 12.1(1) of the OAS Act
  // Max single Top-up rate x Special Qualifying Factor less the income reduction
  const MTU = min0((TU * SQF) - MBI2K) 

  // By default, this only returns GIS. However we can add the FMP for testing purposes
  const GIS = addOAS ? BS + MTU + FMP : BS + MTU + FMP - PE;

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

