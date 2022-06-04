const {
    socialInsurance,
    healthInsurance,
    unemploymentInsurance,
    incomeBeforeTax,
    incomeTaxable,
    personIncomeTax,
} = require('../services/calculate')

const homeController = (req, res) => {
    const gross = req.body.gross || 0
    const area = req.body.area || 1
    const dependentPerson = req.body.dependentPerson || 0

    const calSocialInsurance = socialInsurance(gross)

    const calHealthInsurance = healthInsurance(gross)

    const calUnemploymentInsurance = unemploymentInsurance(gross, area)

    const calIncomeBeforeTax = incomeBeforeTax(gross, area)
    const calIncomeTaxable = incomeTaxable(gross, dependentPerson)

    const calPersonIncomeTax = personIncomeTax(gross, dependentPerson)

    const net = calIncomeBeforeTax - calPersonIncomeTax

    res.render('home', {
        gross: gross,
        socialInsurance: calSocialInsurance,
        healthInsurance: calHealthInsurance,
        unemploymentInsurance: calUnemploymentInsurance,
        incomeBeforeTax: calIncomeBeforeTax,
        incomeTaxable: calIncomeTaxable,
        personIncomeTax: calPersonIncomeTax,
        net: net,
    })
}

module.exports = {
    homeController,
}