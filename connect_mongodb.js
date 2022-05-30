const mongo = require('mongodb');
// To create DB, we need MongoClient object
const mongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/"
const dbName = 'mydb';

mongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    console.log("Connect to Database!");
    const db = client.db(dbName);
    client.close();
})