const fs = require('fs');


function createConnectData(databaseName) {
    const dir = './src'
    const fileName = './src/connect.js'
    var content = ''
    var exec = require('child_process').exec,child;

    if(databaseName === 'mysql') {
        content = `const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "",
  port: 32769,
});
        
module.exports = {con};`
        child = exec('npm install mysql')
    }else if(databaseName === 'mongodb') {
        content = `const mongo = require('mongo');
        // To create DB, we need MongoClient object
        const mongoClient = mongo.MongoClient;
        const url = "mongodb://localhost:27017/"
        const dbName = 'mydb';
        `
        child = exec('npm install mongodb')
    }

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
          recursive: true,
        });
      }

    fs.writeFileSync(fileName, content, err => {
        if (err) {
          console.error(err);
        }
        console.log("Create Database Successful");
      });
}

module.exports = {
    createConnectData
}