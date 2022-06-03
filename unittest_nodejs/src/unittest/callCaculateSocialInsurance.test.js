'use strict';
const callCalculateSocialInsurance = require('./callCaculateSocialInsurance')

describe('Test call social insurance', () => {
    test('Check with gross 0, Should return tax is 0', () => {
        const gross = 0;
        const result = callCalculateSocialInsurance.calculateSocialInsurance(gross)
        expect(result).toEqual(0)
    })

    test('Check with gross 15000000, Should return tax is 1200000', () => {
        const gross = 15000000;
        const result = callCalculateSocialInsurance.calculateSocialInsurance(gross)
        expect(result).toEqual(1200000)
    })

    test('Check with gross 30000000, Should return tax is 1200000', () => {
        const gross = 30000000;
        const result = callCalculateSocialInsurance.calculateSocialInsurance(gross)
        expect(result).toEqual(2384000)
    })
})