'use strict';
const callCalculateUnemploymentInsurance = require('./callCaculateUnemploymentInsurance')

describe('Test call unemployment insurance', () => {
    test('Check with the gross 0 and the area is 1, Should return tax is 0', () => {
        const gross = 0;
        const area = 1;
        const result = callCalculateUnemploymentInsurance.calculateUnemploymentInsurance(gross, area);
        expect(result).toEqual(0)
    })

    test('Check with the gross 15000000 and the area is 1, Should return tax is 150000', () => {
        const gross = 15000000;
        const area = 1;
        const result = callCalculateUnemploymentInsurance.calculateUnemploymentInsurance(gross, area);
        expect(result).toEqual(150000)
    })

    test('Check with the gross 90000000 and the area is 1, Should return tax is 884000', () => {
        const gross = 90000000;
        const area = 1;
        const result = callCalculateUnemploymentInsurance.calculateUnemploymentInsurance(gross, area);
        expect(result).toEqual(884000)
    })

    test('Check with the gross 90000000 and the area is 2, Should return tax is 784000', () => {
        const gross = 90000000;
        const area = 2;
        const result = callCalculateUnemploymentInsurance.calculateUnemploymentInsurance(gross, area);
        expect(result).toEqual(784000)
    })

    test('Check with the gross 90000000 and the area is 1, Should return tax is 686000', () => {
        const gross = 90000000;
        const area = 3;
        const result = callCalculateUnemploymentInsurance.calculateUnemploymentInsurance(gross, area);
        expect(result).toEqual(686000)
    })

    test('Check with the gross 90000000 and the area is 1, Should return tax is 614000', () => {
        const gross = 90000000;
        const area = 4;
        const result = callCalculateUnemploymentInsurance.calculateUnemploymentInsurance(gross, area);
        expect(result).toEqual(614000)
    })
})