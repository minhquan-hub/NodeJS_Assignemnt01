const fs = require("fs");
var exec = require("child_process").exec,
  child;

function buildStructor() {
  const envFile = "./.env";
  const homeViewFile = "./src/views/home.ejs";
  const homeControllerFile = "./src/controllers/homeController.js";
  const calculateFile = "./src/services/calculate.js";
  const baseCssFile = "./src/public/css/base.css";
  const homeCssFile = "./src/public/css/home.css";
  const routeFile = "./src/routes.js";
  const serverFile = "./src/server.js";
  const packageFile = "./package.json";

  const dirList = [
    "./src/models",
    "./src/views",
    "./src/controllers",
    "./src/services",
    "./src/public/css",
  ];
  for (var dir of dirList) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }
  }

  fs.writeFileSync(
    homeViewFile,
    `
    <html>

    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Gross To Net</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <link rel="stylesheet" type="text/css" href="css/base.css" />
        <link rel="stylesheet" type="text/css" href="css/home.css" />
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    </head>
    
    <body>
        <header class="header mb-4">CÔNG CỤ TÍNH LƯƠNG GROSS/NET</header>
        <div class="content container">
            <div>
                <div style=" float: left; overflow: hidden; width: 100% ">
    
                    <div id="ctl00_ContentPlaceHolder1_UpdatePanel2 ">
                        <div class="row " style="float: left; margin: 0px; padding-bottom: 20px; ">
                            <div class="col-md-6 col-sm-12 col-xs-12 p-2" style="padding-right: 0px; ">
                                <div>
                                    <form id="form_convert col-md-6" method="POST" action="/">
                                        <div class="title text-center">
                                            Thu nhập
                                        </div>
    
                                        <div>
                                            <span class="margin-top-5 ">Số Lương: </span><span id="idNhapLuong "
                                                data-toggle="tooltip " data-placement="top "
                                                data-title="Please enter number to salary ">
                                                <input name="gross" type="text" maxlength="14 " style="width:150px; ">
                                            </span>
                                            <span> VND </span>
                                            <div style="display:flex; margin-top: 10px; ">
                                                <div style="margin-right: 10px ">Số người phụ thuộc: </div>
                                                <select name="dependentPerson" value="0">
                                                    <option value="0 ">0 người</option>
                                                    <option value="1 ">1 người</option>
                                                    <option value="2 ">2 người</option>
                                                    <option value="3 ">3 người</option>
                                                    <option value="4 ">4 người</option>
                                                    <option value="5 ">5 người</option>
                                                    <option value="6 ">6 người</option>
                                                    <option value="7 ">7 người</option>
                                                </select>
                                            </div>
    
                                            <div style="display:flex; margin-top: 10px; ">
                                                <div style="margin-right: 10px ">Khu vực: </div>
                                                <select name="area">
                                                    <option value="1 ">Khu vực I</option>
                                                    <option value="2 ">Khu vực II</option>
                                                    <option value="3 ">Khu vực III</option>
                                                    <option value="4 ">Khu vực IV</option>
                                                </select>
                                            </div>
    
    
                                        </div>
    
                                        <div>
                                            <div>
                                            </div>
                                            <div class="f-boder "></div>
                                            <div style="clear: both; ">
                                            </div>
                                            <div>
                                            </div>
                                            <div style="clear: both; ">
                                            </div>
                                            <div style="margin-top: 60px; text-align: center; ">
                                                <Button id="clienGrossi " class="form-control btn-primary bg-orange "
                                                    type="submit" value="Gross To Net ">Gross To Net</Button>
                                            </div>
    
                                        </div>
    
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-12 col-xs-12 ">
                                <div id="blockUI " style="padding: 5px; float: right; z-index: 3; width: 96% ">
                                    <div style="z-index: 5; ">
                                        <div class="title " style="text-align: center ">
                                            Mô tả (VND)
                                        </div>
                                        <div>
                                            <table class="datalist ">
                                                <tbody>
                                                    <tr style="background-color: #848181;" class="rownote ">
                                                        <th style="width: 300px; ">
                                                            Tổng lương
                                                        </th>
                                                        <td style="width: 105px; ">
                                                            <strong>
                                                                <span id="ctl00_ContentPlaceHolder1_lblGrossSalary ">
                                                                    <%=gross%>
                                                                </span></strong>
                                                        </td>
                                                    </tr>
                                                    <tr style="background-color: #E6E6E6; ">
                                                        <th>
                                                            Bảo hiểm xã hội (8 %)
                                                        </th>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_lblSocialInsurance ">
                                                                <%=socialInsurance%>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr style="background-color: #E6E6E6; ">
                                                        <th>
                                                            Bảo hiểm y tế (1.5 %)
                                                        </th>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_lblHealthInsurance ">
                                                                <%=healthInsurance%>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr style="background-color: #E6E6E6; ">
                                                        <th>
                                                            Bảo hiểm thất nghiệp (1 %)
                                                        </th>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_lblThatNghiep ">
                                                                <%=unemploymentInsurance%>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr style="background-color: #848181;" class="rownote ">
                                                        <th style="width: 300px; ">
                                                            Thu nhập trước thuế
                                                        </th>
                                                        <td style="width: 105px; ">
                                                            <strong>
                                                                <span id="ctl00_ContentPlaceHolder1_lblGrossSalary ">
                                                                    <%=incomeBeforeTax%>
                                                                </span></strong>
                                                        </td>
                                                    </tr>
                                                    <tr style="background-color: #E6E6E6; ">
                                                        <th>
                                                            Giảm trừ gia cảnh
                                                        </th>
                                                        <td>
                                                            <span
                                                                id="ctl00_ContentPlaceHolder1_lblGiamTruCaNhan ">11000000</span>
                                                        </td>
                                                    </tr>
                                                    <tr style="background-color: #E6E6E6; ">
                                                        <th>
    
                                                            Giảm trừ phụ thuộc
                                                        </th>
                                                        <td>
                                                            <span
                                                                id="ctl00_ContentPlaceHolder1_lblGiamTruPhuThuoc ">0</span>
                                                        </td>
                                                    </tr>
                                                    <tr style="background-color: #848181;" class="rownote ">
                                                        <th style="width: 300px; ">
                                                            Thu nhập chịu thuế
                                                        </th>
                                                        <td style="width: 105px; ">
                                                            <strong>
                                                                <span id="ctl00_ContentPlaceHolder1_lblGrossSalary ">
                                                                    <%=incomeTaxable%>
                                                                </span></strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            Thuế thu nhập cá nhân
                                                        </th>
                                                        <td>
                                                            <span id="ctl00_ContentPlaceHolder1_lblIncomeTax ">
                                                                <%=personIncomeTax%>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr class="rownote " style="background-color: #848181 ">
                                                        <td>
                                                            <b>Lương thực nhận </b>
                                                            <br>
                                                        </td>
                                                        <td>
                                                            <strong>
                                                                <span id="ctl00_ContentPlaceHolder1_lblNetSalary ">
                                                                    <%=net%>
                                                                </span></strong>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="clear: both; ">
                            </div>
    
                        </div>
    
                    </div>
                </div>
                <div style="clear: both; ">
                </div>
            </div>
        </div>
        </nav>`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFileSync(
    homeControllerFile,
    `
    const {
      socialInsurance,
      healthInsurance,
      unemploymentInsurance,
      incomeBeforeTax,
      incomeTaxable,
      personIncomeTax,
    } = require("../services/calculate");
    
    const homeController = (req, res) => {
      const gross = req.body.gross || 0;
      const area = req.body.area || 1;
      const dependentPerson = req.body.dependentPerson || 0;
    
      const calSocialInsurance = socialInsurance(gross);
    
      const calHealthInsurance = healthInsurance(gross);
    
      const calUnemploymentInsurance = unemploymentInsurance(gross, area);
    
      const calIncomeBeforeTax = incomeBeforeTax(gross, area);
      const calIncomeTaxable = incomeTaxable(gross, dependentPerson);
    
      const calPersonIncomeTax = personIncomeTax(gross, dependentPerson);
    
      const net = calIncomeBeforeTax - calPersonIncomeTax;
    
      res.render("home", {
        gross: gross,
        socialInsurance: calSocialInsurance,
        healthInsurance: calHealthInsurance,
        unemploymentInsurance: calUnemploymentInsurance,
        incomeBeforeTax: calIncomeBeforeTax,
        incomeTaxable: calIncomeTaxable,
        personIncomeTax: calPersonIncomeTax,
        net: net,
      });
    };
    
    module.exports = {
      homeController,
    };
    `,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFileSync(
    routeFile,
    `
  const express = require('express')
  const { homeController } = require('./controllers/homeController')
  
  const routes = express.Router()
  routes.get('/', homeController)
  routes.post('/', homeController)
  
  module.exports = routes`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFileSync(
    calculateFile,
    `
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
      if (insuranceTax > unemploymentInsuranceMax[area])
        return unemploymentInsuranceMax[area];
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
    `,
    (err) => {
      if (err) {
        console.error(err);
      }
      console.log("Create Database Successful");
    }
  );

  fs.writeFileSync(
    baseCssFile,
    `
    :root {
      --primary-color: #009688;
      --white-color: #fff;
      --black-color: #000;
      --text-color: #333;
      --border-color: #dbdbdb;
      --star-gold-color: #ffce3d;
      --header-height: 120px;
      --navbar-height: 34px;
  }
  
  `,
    (err) => {
      if (err) {
        console.error(err);
      }
      console.log("Create Database Successful");
    }
  );

  fs.writeFileSync(
    homeCssFile,
    `
    .header {
      height: 80px;
      background-color: #105476;
      color: #97dc18;
      padding: 0 20px 0 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
  }
  
  
  .title {
      margin: 10px;
      color: #97dc18
  }`,
    (err) => {
      if (err) {
        console.error(err);
      }
      console.log("Create Database Successful");
    }
  );

  fs.writeFileSync(
    serverFile,
    `
    const express = require('express')
    const dotenv = require('dotenv')
    const path = require('path')
    const bodyParser = require('body-parser');
    
    dotenv.config()
    
    app = express()
    const PORT = process.env.PORT || 5000
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))
    
    app.use(express.static(__dirname + '/public'))
    app.use('/', require('./routes'))
    
    
    app.listen(PORT, () => {
        console.log(\`Server listening on http://localhost:\${PORT}\`)
    })`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFileSync(envFile, `PORT=8080`, (err) => {
    if (err) {
      console.error(err);
    }
  });

  if (!fs.existsSync(packageFile)) {
    fs.writeFileSync(
      packageFile,
      `{
        "name": "convert-salary",
        "version": "1.0.0",
        "description": "convert salary",
        "main": "server.js",
        "scripts": {
          "start": "nodemon ./src/server.js"
        },
        "author": "user",
        "license": "ISC",
        "dependencies": {
        }
      }
      `,
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  }

  child = exec("npm install dotenv ejs express nodemon body-parser");
}

module.exports = {
  buildStructor,
};
