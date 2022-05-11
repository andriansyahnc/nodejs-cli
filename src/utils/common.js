const fs = require('fs');

const isParkingLotExists = (file) => {
  if (!fs.existsSync(file)) {
    return false;
  }
  return true;
};

const getFee = (hour) => {
  let fee = 10;
  if (hour <= 2) {
    return fee;
  }
  const additionalFee = (hour - 2) * 10;
  fee += additionalFee;
  return fee;
};

module.exports = {
  isParkingLotExists,
  getFee,
};
