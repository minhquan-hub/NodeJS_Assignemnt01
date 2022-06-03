const { incomeTaxable } = require("../services/calculate");

exports.calculateIncomeTaxable = (gross, dependentPerson) => {
  const data = incomeTaxable(gross, dependentPerson);
  switch (data) {
    case 0:
      return 0;
    case 2425000:
      return 2425000; 
    case 15869000:
      return 15869000; 
    case 11469000:
      return 11469000; 
    case 7069000:
      return 7069000; 
    default:
      return data;
  }
};
