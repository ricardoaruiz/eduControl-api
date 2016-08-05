var LivroDAO = function(conn) {
    this._conn = conn;
};

LivroDAO.prototype.paginacao = function(filtro, callback) {

    var strSQL = this._getListarQuery(filtro, true);

    this._conn.query(strSQL, function(error, result) {
        if(error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });

};

LivroDAO.prototype.listar = function(filtro, callback) {

    var strSQL = this._getListarQuery(filtro, false);

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

LivroDAO.prototype._getListarQuery = function(filtro, count) {
    var sql = '';

    if(!count) {
        sql = 'select * from livros';
    } else {
        sql = 'select count(*) as registros from livros';
    }

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

    if(!count && filtro.pagina && filtro.regPorPagina) {
        if(filtro.pagina > 0 ) filtro.pagina = parseInt(filtro.pagina) * parseInt(filtro.regPorPagina);
        sql += ' LIMIT ' + filtro.pagina + ',' + filtro.regPorPagina;
    }

    return sql;

}

module.exports = function() {
    return LivroDAO;
}