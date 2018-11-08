let express = require('express'),
    path = require('path'),
    http = require('http'),
    app = express(),
    Usuario = require('./app/controller/Usuario'),
    Publi = require('./app/controller/Publi'),
    user = require('./app/Model/User');
    cookieParser = require('cookie-parser'),
    db = require("./app/Model/MongoDocument");
    
    
    
    
    app.set('views', path.join(__dirname, 'app/views'));
    app.set('view engine', 'hbs');
    app.use(cookieParser());


    app.get('/novoUsuario', (req, res) =>{
        let u = null;
        u = new Usuario(req, res);
        console.log(u);
        u.create();
        
        res.end();
    });

    app.get('/novaPublicacao', (req, res) => { 
        if (req.cookies && req.cookies.login) {
            res.render('novaPublicacao', {
                user: req.cookies.email
            });
            return ;
        } else {
            res.redirect('/login');
        }   
    });

    app.get('/novoPubli', (req, res) =>{
        let p = null;
        p = new Publi(req, res);
        console.log(p);
        p.createPubli();
        
        res.end();
    });
    app.get('/login', (req, res) => { 
        console.log("ola");   
        res.render('login');
    });
    app.get('/logar', (req, res) =>{
        var email = req.query.email;
        var senha = req.query.senha;
  var promise_user = db.findOne(email, "usuarios");
    promise_user.then(function (user) {
        console.log(user);
        var Email = user.email;
        var Senha = user.senha;
        if(Email == email && Senha == senha){
            res.cookie('login', Email);
            console.log(req.cookies);

        }else{
            res.redirect('/login');
            console.log("login errado");
        };
        if (req.cookies && req.cookies.login) {
            res.render('index', {
                user: req.cookies.email
            });
            return ;
        } else {
            res.redirect('/login');
        }
    });
  });

  app.get('/logout',function(req,res){
    res.clearCookie('login'); 
    res.redirect('/');
});

app.get('/', function(req, res){
    // Fazendo uma consulta no banco de dados
    var query = { };
    var mysort = { titulo: 1 };
    var cursor = db.find(query, mysort, 100, "publicacoes" );
    cursor.then(function (publicacoes) {
        console.log(cursor);
        db.close();
        res.render('index', {publicacoes: publicacoes});
    });
    
}); 

http.createServer(app).listen(8000);

