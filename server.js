var express = require('./config/express');

var app = express();

var port = process.env.PORTA || 9100

app.listen(port, function() {
    console.log('Edu-control backend rodando em ' + port);
});