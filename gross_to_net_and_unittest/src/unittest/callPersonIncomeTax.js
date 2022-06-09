const { personIncomeTax } = require("../services/calculate");

exports.calculatePersonIncomeTax = (gross, dependentPerson) => {
  const data = personIncomeTax(gross, dependentPerson);
  switch (data) {
    case 0:
      return 0;
    case 121250:
      return 121250; 
    case 1630350:
      return 1630350; 
    case 970350:
      return 970350; 
    case 456900:
      return 456900;  
    default:
      return data;
  }
};
