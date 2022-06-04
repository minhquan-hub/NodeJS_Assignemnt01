const { socialInsurance } = require('../services/calculate')

exports.calculateSocialInsurance = (gross) => {
    const data = socialInsurance(gross);
    switch (data) {
        case 0:
            return 0;
        case 12000000:
            return 12000000;
        case 2384000:
            return 2384000;
        default:
            return data;
    }
}