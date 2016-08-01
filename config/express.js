var express = require('express');
var cors = require('cors');
var expressLoad = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() {
    var app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(expressValidator());

    expressLoad('infra', {cwd : 'app'})
    .then('dao')
    .then('service')
    .then('controller')
    .into(app);

    return app;
}