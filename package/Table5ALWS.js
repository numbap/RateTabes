const { roundUp, roundDown, min0 } = require("./utils.js");

function calculateTable5ALWS(SE, TU, PE, INC, IYEARS = 10, DATE = "2024-04-01") {
  //////////////////////////////////////////////////////////////////
  // This function is accurate for rates from 04-01-2024 and beyond
  // Cannot handle retroactive rate calculations
  // Cannot handle International Operations calculations
  //////////////////////////////////////////////////////////////////
  // Supplement Equivalent (SE)
	//This is the maximum GIS rate for a pensioner who is married to another pensioner, not including the top-up, as provided for under s.22 of the OAS Act.
  // supplement equivalent for the survivor: the amount determined under subsection (4.1), (4.2), (4.3), or (4.4), as the case may be
	//This rate for current payment quarters can be found in the Monthly Canada Pension Plan & Old Age Security Statistical Bulletin in Table 26.
  // Top-Up (TU)
	//This is the maximum top-up rate for an ALWS recipient as provided for under ss 22.1(3) of the OAS Act. It is the same maximum as the single GIS top-up rate.
  // Pension Equivalent (PE)
	//This is the maximum OAS Rate, i.e. 40/40ths, at the +65 rate only.
  // Joint Income (INC)
	//Each member of a couple has their individual income determined as though they were single, i.e their own net income under the Income Tax Act, subject to allowable deductions under "income" in s.2 of the OAS Act, and then their single incomes add together.
 // IO Years (IYEARS)
	//This is the person's number of full years in Canada at the time of the payment months being calculated.
  // Date to be used in future iterations for retroactive calculations
// Calculate Product


  // Calculate Special Qualifying Factor (SQF) for the survivor
	//This fraction is the  number of years of Canadian residence over 10 to a maximum of 10 years. This number is usually 1 unless the person is a recent immigrant. Definitionof SQF found in s.2 of the OAS Act.
  const SQF = Math.min(1, IYEARS/10);
  // Calculate Rounded Pension Equivalent
	//This is the pension equivalent, (i.e. the maximum OAS rate 40/40th, only +65 rate), rounded to the next higher multiple of 3 where it is not already a mulitple of 3.
  const RPE = roundUp(PE, 3) // 
  // Calculate Rounded Monthly Income of the survivor (RMI)
  	// monthly income of the survivor is 1/12th of their income for the base calendar year, rounded to the next lower multiple of 4 where it is not already a multiple of 4.
  const MI = INC / 12
  const RMI = roundDown(MI, 4);

 // (PE * SQF - 3/4 RMI), defined as formula (D * B - 3/4 E) <- Need to find an appropriate legal name // /This is referring to element "C" of the formula (A x B) + C found in paragraph 22(4)(b) of the OAS Act.
 const DB34E = min0((PE * SQF) - (3/4 * RMI))
 const PRODUCT = roundUp(4/3 * RPE * SQF, 4)  //This is the formula for determining the "product" in order to determine which formula to use to calculate the ALWS entitlement.

   // Paragraph 22(4)(b) – Formula (Supplement Equivalent for the Survivor x SQF) + ((PE * SQF) - 3/4 RMI)
  // const ALWS = Supplement Equivalent for the Survivor * SQF + DB34E

  // Additional Amount – Subsection 22.1(3) – Formula TU x SQF – C/4   //This is the Top-Up formula for the ALWS
  // C) is 1/12 of the survivor’s income for the base calendar year in excess of $2000 rounded, to the next lower multiple of four dollars where is not already a multiple of 4.
  const RMI2K = roundDown((INC-2000) /12, 4)
 
// As we discussed, there are 3 separate formulas for the ALWS under subsection 22(4) of the OAS Act:
if(INC === 0 ){
  // Paragraph (a): This formula is reserved for those with NIL income
  //           The formula is: (the pension equivalent multiplied by the SQF) added to (the supplement equivalent for the survivor multiplied by theSQF).
  //                                                (713.34 x 1) + (736.51 x 1) = 1449.85
  //            Then you add the max top-up: 165.04
  //            Total ALWS: $1614.89
  console.log(SE, SQF, PE, 736+713)
  return ((PE * SQF) + (SE* SQF)).toFixed(2)
}
if(MI <= PRODUCT ){
  // Paragraph (b): This formula is reserved for those with monthly income than is less or equal to the product. The product is determined by multiplying 4/3 of rounded pension equivalent and rounding to nearest higher multiple of 4.
  // Rounded pension equivalent is $713.34 rounded to the next higher multiple of 3 = 714 x 4/3 =952. Basically, the formula in paragraph (b) is reserved for those with annual incomes between $1 and $11,424 (using rates from Jan to June 2024)
  //            The formula is (A x B) + C
  //            A = Supplement Equivalent for the Survivor
  //            B = SQF
  //            C = (D x B) -3/4 E
  //            D = Pension Equivalent
  //            E = monthly income of survivor rounded to next lower multiple of 4
  //            Annual income $10,000
  //            ($736.51 x 1) + [(713.34 x 1) – ¾(10,000/12)
  //            736.51+ [713.34 – ¾(832)]
  //            736.51+(713.34 – 624)
  //            736.51 + 89.34
  //            Total ALWS: $825.85 (income too high for top-up amount)
  return ((SE*SQF) + DB34E).toFixed(2)

}
if(MI > PRODUCT ){
  // Paragraph (c): This formula is reserved for those with monthly income that is more than the product as determined above. Basically, the formula in paragraph (c) is reserved for those with annual incomes over $11,424 (using rates from Jan to June 2024)
  //            The formula is (A x B) – C/2
  //            A = Supplement Equivalent for the Survivor
  //            B = SQF
  //            C = residual income of the survivor rounded to the next lower multiple of 2
  const RESINC2 = min0(
    roundDown(MI - (roundUp(4/3 * RPE, 4)), 2)
  )
  // 	(A – B)
  //                        A = monthly income of survivor  ($15,000/12 = 1250)
  //                        B = 4/3 rounded pension equivalent rounded to the next higher multiple of 4 (4/3 714 =952)
  //                       1250 - 952 = 298
  // 	Annual Income $15,000
  //                       ($736.51 x 1) -298/2
  //                        736.51-149 = 587.51
  //                        Total ALWS: $587.51 (income too high for top-up amount.

  return min0(((SE * SQF) - RESINC2/2).toFixed(2))
}

}


// Example usage
// Supplement Equivalent (SE)
const SE = 906.73; // Example values, replace with actual values. "Aggregate maximum supplement"
// Top-Up (TU)
const TU = 166.20;
// Pension Equivalent (PE)
const PE = 718.33;
// OAS and International Years
const YEARS = 40
// Client age
const AGE = 64
console.log(calculateTable5ALWS(SE, TU, PE, 20000, IYEARS = 10, DATE = "2024-04-01"))

module.exports = { calculateTable5ALWS };