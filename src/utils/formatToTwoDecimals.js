const formatToTwoDecimals = (numberToFormat) => {
  const formattedNumber = (Math.round(numberToFormat * 100) / 100).toFixed(2);
  return parseFloat(formattedNumber);
};

export default formatToTwoDecimals;
