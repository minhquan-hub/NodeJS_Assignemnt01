'use strict';
const callIncomeTaxable = require('./callIncomeTaxable')

describe('Test call income taxable', () => {
    test('Check with gross 0 and the dependent person is 1, Should return tax is 0', () => {
        const gross = 0;
        const dependentPerson = 0;
        const result = callIncomeTaxable.calculateIncomeTaxable(gross, dependentPerson)
        expect(result).toEqual(0)
    })

    test('Check with gross 15000000 and the dependent person is 0, Should return tax is 2425000', () => {
        const gross = 15000000;
        const dependentPerson = 0;
        const result = callIncomeTaxable.calculateIncomeTaxable(gross, dependentPerson)
        expect(result).toEqual(2425000)
    })

    test('Check with gross 15000000 and the dependent person is 1, Should return tax is 0', () => {
        const gross = 15000000;
        const dependentPerson = 1;
        const result = callIncomeTaxable.calculateIncomeTaxable(gross, dependentPerson)
        expect(result).toEqual(0)
    })

    test('Check with gross 30000000 and the dependent person is 1, Should return tax is 15869000', () => {
        const gross = 30000000;
        const dependentPerson = 0;
        const result = callIncomeTaxable.calculateIncomeTaxable(gross, dependentPerson)
        expect(result).toEqual(15869000)
    })

    test('Check with gross 30000000 and the dependent person is 1, Should return tax is 11469000', () => {
        const gross = 30000000;
        const dependentPerson = 1;
        const result = callIncomeTaxable.calculateIncomeTaxable(gross, dependentPerson)
        expect(result).toEqual(11469000)
    })

    test('Check with gross 30000000 and the dependent person is 2, Should return tax is 7069000', () => {
        const gross = 30000000;
        const dependentPerson = 2;
        const result = callIncomeTaxable.calculateIncomeTaxable(gross, dependentPerson)
        expect(result).toEqual(7069000)
    })
})