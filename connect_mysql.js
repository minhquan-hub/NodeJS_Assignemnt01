const mysql = require('mysql')
const con = mysql.createConnection({
    host: "localhost",
    user: "sa",
    password: "",
    database: "mydb"
})