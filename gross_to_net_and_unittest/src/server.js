const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const bodyParser = require('body-parser');

dotenv.config()

app = express()
const PORT = process.env.PORT || 8080
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(__dirname + '/public'))
app.use('/', require('./routes'))


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})