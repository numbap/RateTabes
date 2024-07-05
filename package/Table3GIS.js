const { roundUp, roundDown, min0 } = require("./utils.js");

function calculateTable3GIS(SE, TU, PE, INC, YEARS, IYEARS = 10, AGE, DATE = "2024-04-01", addOAS = false) {
//////////////////////////////////////////////////////////////////
// This function is accurate for rates from 04-01-2024 and beyond
// Cannot handle retroactive rate calculations
// Cannot handle International Operations calculations
//////////////////////////////////////////////////////////////////
// Supplement Equivalent – Married to Non-Pensioner (SE)
// This is the maximum GIS rate for a pensioner married to a non-pensioner, not including the top-up as provided for under s.12 of the OAS Act. It is the same as the single rate.

// Top-Up – Married to Non-Pensioner (TU)
//This is the maximum Top-Up rate for a pensioner married to a non-pensioner as provided for under ss. 12.1(1) of the OAS Act.

// Pension Equivalent (PE)
//This is the maximum OAS rate, i.e. 40/40ths

// Joint Income (INC)
//Each member of a couple has their individual income determined as though they were single, i.e. their own net income under the Income Tax Act, subject to allowable deductions under “income” in s.2 of the OAS Act, and then their single incomes added together.

// IO Years (IYEARS)
//This is the person’s number of full years in Canada at the time of the payment months being calculated.
// Date to be used in future iterations for retroactive calculations

// Calculate Special Qualifying Factor (SQF)
//This fraction is the number of years of Canadian residence over 10 to a maximum of 10 years. This number is usually 1 unless the person is a recent immigrant. Definition of SQF found in s.2 of OAS Act.

  const SQF = Math.min(1, IYEARS/10);

// Calculate Full Monthly Pension
//This is the maximum OAS Rate, i.e. 40/40ths. If person over 75, max OAS rate is 10% higher than age 65 rate per s.7 of OAS Act.
  const FMP = AGE >= 75 ? PE * 1.1 : PE

// Calculate Years Based OAS
//This is the actual OAS rate the person is entitled to, whether a full pension or a partial rate determined under s.3 of the OAS Act.

  const YOAS = (Math.min(YEARS, 40)/40) * PE


  // This is Part 1 of the GIS formula under Section 12(5): [(A - B) * C]
//(Max GIS rate (without top-up) + Max OAS rate – pensioners actual OAS monthly rate) x Special Qualifying Factor
  const PMYBG = (SE + FMP - YOAS) * SQF 

  //This is Part 2 of the GIS formula under Section 12(5), the income reduction piece: [-D/2]
//(The couple’s joint annual income/24 – Full monthly pension (always +65 rate) x Special Qualifying Factor (rounded, where not a multiple of 4 to the next higher multiple of 4)/2). This is the Monthly Base Income as determined under paragraph 12(6)(b) of the OAS Act.

  const MBI = min0((INC / 24) - (roundUp(PE * SQF, 4)/2)) 

//This is the income reduction piece of the Top-up formula: [-C/4]
//The couple’s joint annual income/24 that is in excess of $4,000 (rounded, where not a multiple of 4, to the next lower multiple of 4.)
  const INC4000 = min0(roundDown((INC-4000)/24, 4))

// This is the Top-up formula under subsection 12.1 (1)
  const TOPUP = min0((TU * SQF) - (INC4000/4)) 


  // Once the regular GIS piece is calculated under subsection 12(5) and the Top-up piece is calculated under subsection 12.1(1), the two parts are added together to form the one GIS amount paid to the client.
  const GIS = min0(PMYBG - roundDown(MBI, 2)/2) 

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