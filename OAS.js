const { roundUp, roundDown, min0, monthsBetweenDates } = require("./utils.js");

function calculateOAS(PE, YEARS = 40, AGE = 65, DEFER = 0, DATE = "2024-04-01") {
  

  // Partial pensions introduced in July 1977. Calculator tool only goes back to 2001
  const YBO = (Math.min(YEARS, 40)/40) * PE;

  // Adjust bonus75 and deferralFactor based on DATE
  const dateObj = new Date(DATE);
  // 75+ Bonus comes into effect July 2022
  const bonus75 = AGE >= 75 && dateObj >= new Date("2022-07-01") ? 1.1 : 1;

  // Calculate deferral, while validating that deferral is possible


  let deferralMonths = DEFER
  if (dateObj < new Date("2013-07-01")) {
    deferralMonths = 0;
  }
  
  let deferralFactor = 1;

  // Adjust DEFER if DATE is after July 1, 2013
  if (dateObj >= new Date("2013-07-01")) {
    const july2013 = new Date("2013-07-01");
    const maxMonths = monthsBetweenDates("2013-07-01", DATE)
    deferralFactor = 1 + (Math.min(maxMonths, deferralMonths, 60) * 0.006);
  }

  const OASTotal = YBO * bonus75 * deferralFactor;

  return OASTotal.toFixed(2);
}


// Example usage
// Supplement Equivalent (SE)
const DATE = "2023-11-01"; // Example values, replace with actual values
// Top-Up (TU)
const AGE = 78;
const YEARS = 20;
// Pension Equivalent (PE)
const PE = 713.34;
// Joint Income (INC)
const INC = 11000;


console.log("=======================================");
// console.log(monthsBetweenDates("2024-01-01", "2027-01-01"))
console.log(calculateOAS( PE, YEARS, AGE, 0, DATE));
console.log(calculateOAS( PE, YEARS, AGE, 1, DATE));
console.log(calculateOAS( PE, YEARS, AGE, 6, DATE));
console.log(calculateOAS( PE, YEARS, AGE, 12, DATE));
console.log(calculateOAS( PE, YEARS, AGE, 24, DATE));
console.log(calculateOAS( PE, YEARS, AGE, 36, DATE));
console.log(calculateOAS( PE, YEARS, AGE, 48, DATE));
console.log(calculateOAS( PE, YEARS, AGE, 60, DATE));
console.log(calculateOAS( PE, YEARS, AGE, 100, DATE));

module.exports = { calculateOAS };
