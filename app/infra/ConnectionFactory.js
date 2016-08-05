var mysql = require('mysql');

var object = {
    getConnection : function() {
        if(!process.env.NODE_ENV | process.env.NODE_ENV === 'development') {
            return mysql.createConnection({
                user : 'root',
                password : 'root',
                host : 'localhost',
                database : 'eduControl'
            });
        }

        if(process.env.NODE_ENV === 'production') {
            return mysql.createConnection({
                user : 'b02e0832da6d1d',
                password: '65912b5a',
                host : 'us-cdbr-iron-east-04.cleardb.net',
                database : 'heroku_bf2733d210a0d62'
            });
        } 

    }
};

module.exports = function() {
    return object;
}