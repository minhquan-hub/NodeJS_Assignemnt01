'use strict';
const callPersonIncomeTax = require('./callPersonIncomeTax')

describe('Test call calculate person income tax', () => {
    test('Check with gross 0 and the dependent person is 0, Should return tax is 0', () => {
        const gross = 0;
        const dependentPerson = 0;
        const result = callPersonIncomeTax.calculatePersonIncomeTax(gross, dependentPerson)
        expect(result).toEqual(0)
    })

    test('Check with gross 15000000 and the dependent person is 0, Should return tax is 121250', () => {
        const gross = 15000000;
        const dependentPerson = 0;
        const result = callPersonIncomeTax.calculatePersonIncomeTax(gross, dependentPerson)
        expect(result).toEqual(121250)
    })

    test('Check with gross 15000000 and the dependent person is 1, Should return tax is 0', () => {
        const gross = 15000000;
        const dependentPerson = 1;
        const result = callPersonIncomeTax.calculatePersonIncomeTax(gross, dependentPerson)
        expect(result).toEqual(0)
    })

    test('Check with gross 30000000 and the dependent person is 0, Should return tax is 1630350', () => {
        const gross = 30000000;
        const dependentPerson = 0;
        const result = callPersonIncomeTax.calculatePersonIncomeTax(gross, dependentPerson)
        expect(result).toEqual(1630350)
    })

    test('Check with gross 30000000 and the dependent person is 1, Should return tax is 970350', () => {
        const gross = 30000000;
        const dependentPerson = 1;
        const result = callPersonIncomeTax.calculatePersonIncomeTax(gross, dependentPerson)
        expect(result).toEqual(970350)
    })

    test('Check with gross 30000000 and the dependent person is 2, Should return tax is 456900', () => {
        const gross = 30000000;
        const dependentPerson = 2;
        const result = callPersonIncomeTax.calculatePersonIncomeTax(gross, dependentPerson)
        expect(result).toEqual(456900)
    })

    
})