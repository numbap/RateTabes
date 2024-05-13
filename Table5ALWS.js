const { roundUp, roundDown, min0 } = require("./utils.js");

function calculateTable5ALWS(SE, TU, PE, INC, IYEARS = 10, DATE = "2024-04-01") {
  //////////////////////////////////////////////////////////////////
  // This function is accurate for rates from 04-01-2024 and beyond
  // Cannot handle retroactive rate calculations
  // Cannot handle International Operations calculations
  //////////////////////////////////////////////////////////////////
  // Supplement Equivalent (SE)
  // supplement equivalent for the survivor: the amount determined under subsection (4.1), (4.2), (4.3), or (4.4), as the case may be
  // Top-Up (TU)
  // Pension Equivalent (PE)
  // Joint Income (INC)
 // IO Years (IYEARS)
  // Date to be used in future iterations for retroactive calculations
// Calculate Product








// All of these amounts are what Legacy is showing for these income amounts. Hopefully, with this information, you can get the same result.















  // Calculate Special Qualifying Factor (SQF) for the survivor
  const SQF = Math.min(1, IYEARS/10);
  const RPE = roundUp(PE, 3) // Why are we doing Rounded Pension Equivalent?
  // Calculate Rounded Monthly Income (RMI)
  // monthly income of the survivor rounded to the next lower multiple of four dollars
  const MI = INC / 12
  const RMI = roundDown(MI, 4);
 // (PE * SQF - 3/4 RMI), defined as formula (D * B - 3/4 E) <- Need to find an appropriate legal name
 const DB34E = min0((PE * SQF) - (3/4 * RMI))
 const PRODUCT = roundUp(4/3 * RPE * SQF, 4)

//  roundDown(MI - 4/3 * roundUp(RPE, 4), 2)

   // Paragraph 22(4)(b) – Formula (SE x SQF) + ((PE * SQF) - 3/4 RMI)
  // const ALWS = SE * SQF + DB34E

  // Additional Amount – Subsection 22.1(3) – Formula TU x SQF – C/4
  // C) is 1/12 of the survivor’s income for the base calendar year in excess of $2000 rounded, to the next lower multiple of four dollars
  const RMI2K = roundDown((INC-2000) /12, 4)
  const AA = ((TU * SQF) - (RMI2K/4))

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
  //return (ALWS + AA).toFixed(2);
}

// Example usage
// Supplement Equivalent (SE)
const SE = 736.51; // Example values, replace with actual values
// Top-Up (TU)
const TU = 165.04;
// Pension Equivalent (PE)
const PE = 713.34;

console.log("=======================================");
console.log(0, calculateTable5ALWS(SE, TU, PE, 0), ":", 1449.85);
console.log(100, calculateTable5ALWS(SE, TU, PE, 100), ":", 1443.85);
console.log(1000, calculateTable5ALWS(SE, TU, PE, 1000), ":", 1389.85);
console.log(2500, calculateTable5ALWS(SE, TU, PE, 2500), ":", 1293.85);
console.log(5000, calculateTable5ALWS(SE, TU, PE, 5000), ":", 1137.85);
console.log(8000, calculateTable5ALWS(SE, TU, PE, 8000), ":", 951.85);
console.log(10000, calculateTable5ALWS(SE, TU, PE, 10000), ":", 825.85);
console.log(12000, calculateTable5ALWS(SE, TU, PE, 12000), ":", 712.51);
console.log(15000, calculateTable5ALWS(SE, TU, PE, 15000), ":", 587.51);
console.log(17500, calculateTable5ALWS(SE, TU, PE, 17500), ":", 483.51);
console.log(20000, calculateTable5ALWS(SE, TU, PE, 20000), ":", 379.51);
console.log(25000, calculateTable5ALWS(SE, TU, PE, 25000), ":", 171.51);
console.log(30000, calculateTable5ALWS(SE, TU, PE, 30000), ":", 0);

module.exports = { calculateTable5ALWS };