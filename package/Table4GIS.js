const { roundUp, roundDown, min0 } = require("./utils.js");

function calculateTable4GIS(SE, TU, PE, INC, YEARS, IYEARS = 10, AGE, DATE = "2024-04-01") {
//////////////////////////////////////////////////////////////////
  // This function is accurate for rates from 04-01-2024 and beyond
  // Cannot handle retroactive rate calculations
  // Cannot handle International Operations calculations
  //////////////////////////////////////////////////////////////////
  // Supplement Equivalent (SE)- Married to an OAS Allowance recipient
	// This is the maximum GIS rate for a pension who is married to an OAS Allowance Recipient, not including the top-up, as provided for under s.22 of the OAS Act. It is the same as the married rate for pensioners married to another OAS pensioner under Table 2.
  // Top-Up (TU)- Married to an OAS Allowance recipient
	// This is the maximum Top-Up rate for a pensioner married to an OAS Allowance Recipient as provided for under ss22.1(1) of the OAS Act.
  // Pension Equivalent (PE)
	//This is the maximum OAS rate. i.e. 40/40ths
  // Joint Income (INC)
	//Each member of a couple has their individual income determined as though they were single, i.e. their own net income under the Income Tax Act, subject to allowable deductions under "income" in s.2 of the OAS Act, and then their single incomes added together.
  // IO Years (YEARS)
	// This is the person's number of full years in Canada at the time of the payment months being calculated.
  // Date to be used in future iterations for retroactive calculations

  // Calculate Full Monthly Pension
	//This is the maximum OAS rate, i.e.40/40ths. If person over 75, max OAS rate is 10% higher than age 65 rate per s.7 of OAS Act.
  const FMP = AGE >= 75 ? PE * 1.1 : PE

 // Calculate Rounded Pension Equivalent
	//This is the maximum OAS rate, i.e. 40/40th rounded to the next higher multiple of $3 when not already a multiple of 3.
  const RPE = roundUp(PE, 3)
  
  // Calculate Years Based OAS
	//This is the actual OAS rate the person is entitled to, whether a full pension or a partial rate determined under s.3 of the OAS Act.
  const YOAS = (Math.min(YEARS, 40)/40) * FMP

  // Calculate Special Qualifying Factor (SQF)
	//This fraction is the number of years of Canadian residence over 10 to a maximum of 10 years. This number is usually 1 unless the person is a recent immigrant. Definition of SQF found in s.2 of the OAS Act.
  const SQF = Math.min(1, IYEARS/10);

  // Calculate Monthly Joint Income (MJI) and MJI over $4000 (MJI4K)
	//This part of the GIS calculation formula takes the couple's joint income and divides it by 12 to get the monthly amount.
  const MJI = min0(INC / 12);
  	//This is the income part of the top-up formula where the first $4000 is subtracted from the couple's joint income, which is then divided by 24 for the monthly base income and then divided by 4. This is related to the reduction rates. 
  const MJI4K = roundDown(min0(INC - 4000) / 24, 4);

  // const QPE = SQF * PE;
  //This is the maximum OAS rate, i.e. 40/40ths multiplied by the Special Qualifying Factor
  const QTU = SQF * TU;
  //This is the manximum Top-Up rate multiplied by the Special Qualifying Factor.
  const QRPE = RPE * SQF;

  // This is the rounded pension equivalent, i.e max OAS rate (40/40th) rounded to the next higher multiple of 3 if not already a mulitple of 3 and then multiplied by the Special Qualifying Factor.

 // Calculate Residual Joint Income (RJI)
	//This formula is A - B, where A is the monthly joint income of pensioner and spouse/common-law partner in the current payment period and B is four-thirds of the rounded pension equivalent, multiplied by the special qualifying factor and rounded to the next higher mulitple of $4 where it is not already a multiple of $4. This formula is found in the definitions section of s.22 of the OAS Act. the
  const RJI = min0(MJI - roundUp((4 / 3) * QRPE, 4));

  	//The result of the A-B formula for the RJI is then rounded to the next lower multiple of 4 where not already a multiple of 4 and then that result is divided by 4.  This last part is the income reduction factor, i.e where every $2 of your individual income reduces your GIS by $1
  const RJIA = roundDown(RJI, 4) / 4 // D/4

  // Calculate Base Sumpplement (BS)
	//This is the GIS formula set out under subsection 22(2) of the OAS Act.
	//(Max GIS rate (without top-up)+ Max OAS rate - pensioners actual OAS monthly rate) x special qualifying factor -  (residual joint income, rounded and divided by 4))
  const BS = ((SE + FMP - YOAS) * SQF) - RJIA

  // Calculate Modified Top-Up (MTU)
	//This is the GIS top-up formula set out under subsection 22.1(1) of the OAS Act.
	//Max married top-up rate x Special Qualifying Factor less the income reduction.
  const MTU = min0(QTU - MJI4K / 4)

  // Calculate Income-Adjusted Top-Up (IATU)
  const GIS = BS + MTU + YOAS

  	//This is the total OAS benefit amount: the person's base supplement amount + their top-up amount based on their level ofincome and added to their OAS pension rate based on their years of residence in Canada.

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
// console.log(30000, calculateTable4GIS(SE, TU, PE, 30000, YEARS, YEARS, AGE), ":", 960.18, ":", 1031.51); // Breaks down because ALW is $0. Use Table 3.
// console.log(35000, calculateTable4GIS(SE, TU, PE, 35000, YEARS, YEARS, AGE), ":", 960.18, ":", 1031.51);
// console.log(40000, calculateTable4GIS(SE, TU, PE, 40000, YEARS, YEARS, AGE), ":", 960.18, ":", 1031.51);

module.exports = { calculateTable4GIS };