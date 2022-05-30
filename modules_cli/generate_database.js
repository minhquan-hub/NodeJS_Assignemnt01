const fs = require('fs');


function createConnectData(databaseName) {
    console.log(databaseName)
    const dir = './src'
    const fileName = './src/connect.js'
    var content = ''

    if(databaseName === 'mysql') {
        content = `const mysql = require('mysql');
        const con = mysql.createConnection({
        host: "localhost",
        user: "sa",
        password: "",
        database: "mydb"
    });`
    }else if(databaseName === 'mongodb') {
        content = `const mongo = require('mongodb');
        // To create DB, we need MongoClient object
        const mongoClient = mongo.MongoClient;
        const url = "mongodb://localhost:27017/"
        const dbName = 'mydb';`
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
        console.log("Create Successful");
      });
}

module.exports = {
    createConnectData
}