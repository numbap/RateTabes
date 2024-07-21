const { roundUp, roundDown, min0 } = require("./utils.js");

function calculateTable4ALW(SE, TU, PE, INC, IYEARS = 10, DATE = "2024-04-01") {
    //////////////////////////////////////////////////////////////////
  // This function is accurate for rates from 04-01-2024 and beyond
  // Cannot handle retroactive rate calculations
  // Cannot handle International Operations calculations
  //////////////////////////////////////////////////////////////////
  // Supplement Equivalent (SE)
	//This is the maximum GIS rate for a pensioner who is married to another pensioner, not including the top-up, as provided for under s.22 of the OAS Act.
  // Top-Up (TU)
	//This is the maximum Top-Uprate for an Allowance recipient as provided for under ss 22.1(2) of the OAS Act.
  // Pension Equivalent (PE)
	//This is the maximum OAS rate, i.e. 40/40th, at the +65 rate only.
  // Joint Income (INC)
	//Each member of a couple has their individual income determined as though they were single, i.e. theirown net income under the Income Tax Act, subject to allowable deductions under "incomein s.2 ofthe OAS Act, and then their single incomes add together.
 // IO Years (IYEARS)
	//This is the person's number of full years in Canada at the time of the payment months being calculated.
  // Date to be used in future iterations for retroactive calculations

  // Calculate Special Qualifying Factor (SQF)
  //This fraction isthe number of years of Canadian residence over 10 to a maximum of 10years. This number is usually 1 unless the person is a recent immigrant. Definition of SQF found in s.2 of the OAS Act.
  const SQF = Math.min(1, IYEARS/10);

  // Calculate Monthly Joint Income (MJI) and MJI over $4000 (MJI4K)
  //This first part of the ALW calculation formula takes the couple's joint income and divides it by 12 to get the monthly amount.
  const MJI = min0(INC / 12);

  //This is the income part of the top-up formula where the first $4000 is substractd from the couple's joint income, which is then divided by 24 for the monthly base income and then divided by 4. This is related to the reduction rates.
  const MJI4K = min0((INC - 4000) / 12);

  // Step 3: Apply SQF to System Values
  const QSE = SQF * SE; //This is the maximum supplement rate (i.e. married rate, pensioner married to pensioner) not including top-up multiplied by special qualifying factor
  const QPE = SQF * PE; //This is the pension equivalent, which is the maximum +65 OAS pension rate, multiplied by the special qualifying factor.
  const QTU = SQF * TU; 	//This is the maximum top-up, at the married rate, multiplied by the special qualifying factor.
  const QRPE = roundUp(PE, 3) * SQF; //This is the rounded pension equivalent, i.e.max OAS rate (40/40th) rounded to the next higher multiple of 3, if not already a multiple of 3, and then mulitiplied by the special qualifying factor.
  const PRODUCT = (4 / 3) * QRPE; //To determine which ALW formula to use to calculate the benefit, you must first determine the "product". The "product" is 4/3 of the rounded pension equivalent multipled by the special qualifying factor.

  // Calculate 3/4 Monthly Joint Income (MJI3/4)
  const MJI34 = min0((3 / 4) * roundDown(MJI, 4)); ////For the ALW formula under paragraph 22(3)(b), for the income portion of the formula, the maximum benefit rate is reduced by 3/4 of the monthly joint income, which is then rounded down to the lower multiple of 4 where it is not already a multiple of 4.

  // Calculate Residual Joint Income (RJI)
  //This formula is A - B, where A is the monthly joint income of pensioner and spouse/common-law partner in the current payment period and B is four-thirds of the rounded pension equivalent, multiplied by the special qualifying factor and rounded to the next higher multiple of $4 where it is not already a multiple of $4. This formula is found in the definitions section of s.22 of the OAS Act.
  const RJI = MJI - roundUp((4 / 3) * QRPE, 4);

  // Calculate Income-Adjusted Top-Up (IATU)
  //This formula takes the maximum married top-up rate, multiplies it by the special qualifying factor and then subtracts the income reduction, which is 1/24th of the couple's joint income for the base calendar year in excess of $4000 and rounded to the next lower multiple of 4 if not already a multiple of 4, and then this amount is divided by 4.
  const IATU = min0(QTU - roundDown(MJI4K / 2, 4) / 4);

  let ALW;

  // Step 7: Calculate Total Allowance (ALW) based on INC
  //The ALW calculation differs depending on level of income
  if (INC === 0) {
    ALW = QPE + QSE + QTU; //If joint income is NIL, then the maximum ALW rate is payable (a combination of the maximum pension equivalent and maximum supplement equivalent), plus the maximum top-up rate.
  } else if (MJI <= PRODUCT) {
    ALW = QSE + (QPE - MJI34) + IATU; //If the couple's joint income is greater than 0 and less than or equal to the "product", the ALW formula reduces the pension equivalent portion based on income, where the pension equivalent is reduced by 3/4 of the monthly joint income that is rounded to the next lower multiple of 4 where not already a multiple of 4.
  } else {
    ALW = QSE - roundDown(RJI, 4) / 4 + IATU; //If the couple's joint income is greater than the "product", the ALW formula starts to reduce the supplement equivalent portion as well. The supplement equivalent is reduced by the residual joint income of the couple, rounded to the next lower multiple of 4 where not already a multiple of 4 and then this amount is divided by 4.
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



module.exports = { calculateTable4ALW };
