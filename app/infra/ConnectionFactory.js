var mysql = require('mysql');

var object = {
    getConnection : function() {
        return mysql.createConnection({
            user : 'root',
            password : 'root',
            host : 'localhost',
            database : 'eduControl'
        });
    }
};

module.exports = function() {
    return object;
}