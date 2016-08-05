module.exports = function(app) {
    return {

        paginacao : function(filtro) {

            return new Promise(function(resolve, reject){
                var conn = app.infra.ConnectionFactory.getConnection();

                livroDAO = new app.dao.LivroDAO(conn);

                livroDAO.paginacao(filtro, function(error, result) {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });

                conn.end();
            });          

        },

        listar : function(filtro) {

            return new Promise(function(resolve, reject){
                var conn = app.infra.ConnectionFactory.getConnection();

                livroDAO = new app.dao.LivroDAO(conn);

                livroDAO.listar(filtro, function(error, result) {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });

                conn.end();
            });

        },

        salvar : function(livro) {
            return new Promise(function(resolve, reject) {

                var conn = app.infra.ConnectionFactory.getConnection();

                livroDAO = new app.dao.LivroDAO(conn);

                livroDAO.salvar(livro, function(error, result) {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });

                conn.end();
            });
        }
    };
}