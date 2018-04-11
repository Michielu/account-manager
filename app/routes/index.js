const express = require('express');
const app = express.Router();

const noteRoutes = require('./note_routes');
const userRoutes = require('./user_routes');

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/signup', function (req, res) {
    res.render('signup');
});

module.exports = function (app, db) {
    noteRoutes(app, db);
    userRoutes(app, db);
    // Other route groups could go here
};