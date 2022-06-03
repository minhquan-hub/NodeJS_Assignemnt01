const fs = require("fs");
var exec = require("child_process").exec,
  child;

function generateDatabaseMongodb() {
  const dirList = ["./src/db/seeds", "./src/models"];
  const taxModelFile = "./src/models/tax.js";
  const insuranceModelFile = "./src/models/insurance.js";
  const seedDataFile = "./src/db/seeds/seed_data.js";
  const connectFile = "./src/db/connect.js";
  const packageFile = "./package.json";

  for (var dir of dirList) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }
  }

  fs.writeFileSync(
    taxModelFile,
    `
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    
    const taxSchema = new Schema({
        TaxPercent: Number,
        max: Number,
        min: Number
    });
    
    const Tax = mongoose.model('tax', taxSchema);
    
    module.exports = Tax;`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFileSync(
    insuranceModelFile,
    `
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    
    const insuranceSchema = new Schema({
        name: String,
        TaxPercent: Number
    });
    
    const Insurance = mongoose.model('insurance', insuranceSchema);
    
    module.exports = Insurance;`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFileSync(
    seedDataFile,
    `
    const mongoose = require('mongoose')
    const Database = require('../connect')
    const Tax = require('../models/tax')
    const Insurance = require('../models/insurance');
    
    new Database();
    const seedTax = [
        {
            TaxPercent: 5,
            max: 5,
            min: 0
        },
        {
            TaxPercent: 10,
            max: 10,
            min: 5
        },
        {
            TaxPercent: 15,
            max: 18,
            min: 10
        },
        {
            TaxPercent: 20,
            max: 32,
            min: 18
        },
        {
            TaxPercent: 25,
            max: 52,
            min: 32
        },
        {
            TaxPercent: 30,
            max: 80,
            min: 52
        },
        {
            TaxPercent: 35,
            max: 1000,
            min: 80
        }
    ]
    
    const seedInsurance = [
        {
            name: 'Social Insurance',
            TaxPercent: 8
        },
        {
            name: 'Health Insurance',
            TaxPercent: 1.5
        },
        {
            name: 'Unemployment Insurance',
            TaxPercent: 1
        }
    ]
    
    const seedDB = async () => {
        await Tax.deleteMany({});
        await Tax.insertMany(seedTax)
        await Insurance.deleteMany({});
        await Insurance.insertMany(seedInsurance);
    }
    
    
    seedDB().then(() => {
        mongoose.disconnect();
    })
    
    `,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFileSync(
    connectFile,
    `
    const mongoose = require("mongoose");

    const server = "127.0.0.1:27017";
    const database = "test_mongodb";
    
    class Database {
      constructor() {
        this._connect();
      }
    
      _connect() {
        mongoose
          .connect(\`mongodb://\${server}/\${database}\`)
          .then(() => {
            console.log("Database connection successful");
          })
          .catch((err) => console.error("Database connection error"));
      }
    }
    
    module.exports = Database;
    `,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

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

  child = exec("npm install mongoose");
}

module.exports = {
  generateDatabaseMongodb,
};
