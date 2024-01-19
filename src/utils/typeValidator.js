const isNumeric = (str) => {
  if (typeof str === "number") return true;

  if (typeof str !== "string") return false; // it has to be string

  return (
    !isNaN(str) && // isNaN('10px') = true, isNaN('10') = false
    !isNaN(parseFloat(str)) // isNaN(' ') = false, isNaN(parseFloat(' ')) = true
  );
};

const isInteger = (number) => {
  return Number.isInteger(number);
};

module.exports = {
  isNumeric,
  isInteger,
};
