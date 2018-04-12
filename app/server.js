const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

// //Enable CORS access 
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })

app.set('view engine', 'ejs');
app.set('views', (__dirname) + '/views/pages');

app.use(require("./routes/redirect"));

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./routes')(app, database);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})