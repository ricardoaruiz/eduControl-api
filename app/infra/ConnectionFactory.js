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
            var urlConexao = process.env.CLEARDB_DATABASE_URL;
            var grupos = urlConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/);
            return mysql.createConnection({
                user : grupos[1],
                password : grupos[2],
                host : grupos[3],
                database : grupos[4],
                debug : false
            });
        } 

    }
};

module.exports = function() {
    return object;
}