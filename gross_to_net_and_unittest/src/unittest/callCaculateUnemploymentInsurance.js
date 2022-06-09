const { unemploymentInsurance } = require("../services/calculate");

exports.calculateUnemploymentInsurance = (gross, area) => {
  const data = unemploymentInsurance(gross, area);
  switch (data) {
    case 0:
      return 0;
    case 150000:
      return 150000;
    case 884000:
      return 884000;
    case 784000:
      return 784000;
    case 686000:
      return 686000;
    case 614000:
      return 614000;
    default:
      return data;
  }
};
