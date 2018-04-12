const express = require('express');
const app = express.Router();

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/signup', function (req, res) {
    res.render('signup');
});

module.exports = app;