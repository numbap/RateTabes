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

module.exports = { roundUp, roundDown, min0 };
