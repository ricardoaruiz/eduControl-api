module.exports = function(app) {

    var livroService = app.service.LivroService;

    app.get('/livros', function(req, res) {

        var filtro = {
            titulo : req.query.titulo,
            descricao : req.query.descricao,
            preco : req.query.preco
        }

        livroService.listar(filtro)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(error) {
            res.status(500).send();
        });
    });  

    app.post('/livros', function(req, res) {

        var errors = createLivroValidate(req);
        if(errors) {
            res.status(400).json(errors);
        }

        var livro = req.body;

        livroService.salvar(livro)
        .then(function(result) {
            res.status(201).send();
        })
        .catch(function(error) {
            res.status(500).send();
        })

    });

    var createLivroValidate = function(req) {

        req.assert('titulo', 'Campo obrigatório').notEmpty();
        req.assert('titulo', 'Campo deve conter no maximo 255 caracteres').len(1,255);
        req.assert('descricao', 'Campo obrigatório').notEmpty();
        req.assert('preco', 'Campo obrigatório').notEmpty();
        req.assert('preco', 'Campo deve ser numérico').isFloat();        

        var errors = req.validationErrors();
        if(errors) {
            return errors;
        }
    }

};