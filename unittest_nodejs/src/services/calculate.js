const taxPercents = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35];
const taxLevels = [
  0, 5000000, 10000000, 18000000, 32000000, 52000000, 80000000,
];
const taxsMax = [0, 250000, 500000, 1200000, 2800000, 5000000, 8400000];

const socialInsurancePercent = 0.08;
const socialInsuranceMax = 2384000;

const healthInsurancePercent = 0.015;
const healthInsuranceMax = 447000;

const unemploymentInsurancePercent = 0.01;
const unemploymentInsuranceMax = [884000, 784000, 686000, 614000];

const reduceFamilySituation = 11000000;
const dependentPersonTax = 4400000;

function socialInsurance(gross) {
  let insuranceTax = gross * socialInsurancePercent;
  if (insuranceTax > socialInsuranceMax) return socialInsuranceMax;
  return insuranceTax;
}

function healthInsurance(gross) {
  let insuranceTax = gross * healthInsurancePercent;
  if (insuranceTax > healthInsuranceMax) return healthInsuranceMax;
  return insuranceTax;
}

function unemploymentInsurance(gross, area) {
  let insuranceTax = gross * unemploymentInsurancePercent;
  if (insuranceTax > unemploymentInsuranceMax[area - 1])
    return unemploymentInsuranceMax[area - 1];
  return insuranceTax;
}

function incomeBeforeTax(gross, area) {
  let socialInsuranceTax = socialInsurance(gross);

  let healthInsuranceTax = healthInsurance(gross);

  let unemploymentInsuranceTax = unemploymentInsurance(gross, area);

  return (
    gross - (socialInsuranceTax + healthInsuranceTax + unemploymentInsuranceTax)
  );
}

function incomeTaxable(gross, dependentPerson) {
  let incomeBefore = incomeBeforeTax(gross);
  let dependentTax = dependentPersonTax * dependentPerson;
  let taxable = incomeBefore - (reduceFamilySituation + dependentTax);
  if (taxable > 0) return taxable;
  return 0;
}

function personIncomeTax(gross, dependentPerson) {
  const incomeTaxable1 = incomeTaxable(gross, dependentPerson);
  let personIncomeTax = 0;
  for (var i = 0; i < taxLevels.length - 1; i++) {
    if (incomeTaxable1 > taxLevels[i]) {
      personIncomeTax += taxsMax[i];
    } else if (
      incomeTaxable1 > taxLevels[i - 1] &&
      incomeTaxable1 < taxLevels[i]
    ) {
      personIncomeTax +=
        (incomeTaxable1 - taxLevels[i - 1]) * taxPercents[i - 1];
    }
  }

  return personIncomeTax;
}

module.exports = {
  socialInsurance,
  healthInsurance,
  unemploymentInsurance,
  incomeBeforeTax,
  incomeTaxable,
  personIncomeTax,
};
