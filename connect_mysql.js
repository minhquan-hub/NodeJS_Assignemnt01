const mysql = require('mysql')
const con = mysql.createConnection({
    host: "localhost",
    user: "sa",
    password: "",
    database: "mydb"
})

con.connect(function (err) {
    if(err) throw err
    console.log('connected!')
})