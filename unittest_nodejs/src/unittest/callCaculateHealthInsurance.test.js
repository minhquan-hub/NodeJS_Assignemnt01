'use strict';
const callCalculateHealthInsurance = require('./callCaculateHealthInsurance')

describe('Test call health insurance', () => {
    test('Check with gross 0, Should return tax is 0', () => {
        const gross = 0;
        const result = callCalculateHealthInsurance.calculateHealthInsurance(gross)
        expect(result).toEqual(0)
    })

    test('Check with gross 15000000, Should return tax is 225000', () => {
        const gross = 15000000;
        const result = callCalculateHealthInsurance.calculateHealthInsurance(gross)
        expect(result).toEqual(225000)
    })

    test('Check with gross 30000000, Should return tax is 447000', () => {
        const gross = 30000000;
        const result = callCalculateHealthInsurance.calculateHealthInsurance(gross)
        expect(result).toEqual(447000)
    })
})