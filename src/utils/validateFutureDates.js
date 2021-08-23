import moment from "moment";

const validateFutureDates = (current) => {
  const yesterday = moment().subtract(1, "day");
  return current.isAfter(yesterday);
};

export default validateFutureDates;
