var LivroDAO = function(conn) {
    this._conn = conn;
};

LivroDAO.prototype.listar = function(filtro, callback) {

    var strSQL = this._getListarQuery(filtro);

    this._conn.query(strSQL, function(error, result) {
        if(error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
};

LivroDAO.prototype.salvar = function(livro, callback) {

    this._conn.query('insert into livros (titulo, descricao, preco) values (?,?,?)', 
        [livro.titulo, livro.descricao, livro.preco], function(error, result) {
            if(error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
};

LivroDAO.prototype._getListarQuery = function(filtro) {
    var sql = 'select * from livros';

    if(filtro.titulo || filtro.descricao || filtro.preco) {
        var whereClause = ' where ';
        if(filtro.titulo) {
            whereClause += 'titulo like "%' + filtro.titulo + '%"';
        }
        if(filtro.descricao) {
            if(whereClause.match(/titulo like /)) whereClause += ' and '; 
            whereClause += 'descricao like "%' + filtro.descricao + '%"';
        }
        if(filtro.preco) {
            if(whereClause.match(/titulo like |descricao like /)) whereClause += ' and ';
            whereClause += 'preco = ' + filtro.preco.replace(/,/,'\.');
        }
        sql += whereClause;
    }

    return sql;

}

module.exports = function() {
    return LivroDAO;
}