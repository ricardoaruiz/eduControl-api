var express = require('./config/express');

var app = express();

app.set('port', 9100);

app.listen(app.get('port'), function() {
    console.log('Edu-control backend rodando em ' + app.get('port'));
});