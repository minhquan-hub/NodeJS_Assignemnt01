const { healthInsurance } = require('../services/calculate')

exports.calculateHealthInsurance = (gross) => {
    const data = healthInsurance(gross);
    switch (data) {
        case 0:
            return 0;
        case 225000:
            return 225000;
        case 447000:
            return 447000;
        default:
            return data;
    }
}