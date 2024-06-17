// This function rounds up to the next integer multiple of a specified value, if not already an integer multiple of that number.
function roundUp(number, multiple) {
  return Math.ceil(number / multiple) * multiple;
}

// This function rounds down to the next integer multiple of a specified value, if not already an integer multiple of that number.
function roundDown(number, multiple) {
  return Math.floor(number / multiple) * multiple;
}

// This function ensures that value cannot be less than zero
function min0(number) {
  return number > 0 ? number : 0;
}

// This function calculates the Residual Joint Income as defined by the OAS Act.
function calcRJI(INC, RPE, SQF){
  return min0((INC / 12) - ((4/3) * RPE * SQF))
}

// This function calculates the Rounded Pension Equivalent, ad defined by the OAS Act
function calcRPE(PE){
  return roundUp(PE, 3)
}

// Calculates the number of months between 2 dates. Required for various OAS functions
function monthsBetweenDates(date1, date2) {
  // Parse the input dates
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Calculate the difference in months
  const monthsDifference = (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth();

  // Return the absolute value of the difference
  return Math.abs(monthsDifference);
}


module.exports = { roundUp, roundDown, min0, calcRJI, calcRPE, monthsBetweenDates };
