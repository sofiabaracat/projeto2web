let express = require('express'),
    path = require('path'),
    http = require('http'),
    app = express(),
    Usuario = require('./app/controller/Usuario'),
    user = require('./app/Model/User');
    cookieParser = require('cookie-parser');
    
    
    
    
    app.set('views', path.join(__dirname, 'app/views'));
    app.set('view engine', 'hbs');
    app.use(cookieParser());

    app.get('/', (req, res) => {    
        res.render('cadastro');
    });
    app.get('/novoUsuario', (req, res) =>{
        let u = null;
        u = new Usuario(req, res);
        console.log(u);
        u.create();
        
        res.end();
    });

    app.get('/login', (req, res) => { 
        console.log("ola");   
        res.render('login');
    });
    app.get('/logar', (req, res) =>{
        var email = req.query.email;
        var senha = req.query.senha;
  var db = require("./app/Model/MongoDocument");
  var promise_user = db.findOne(email, "usuarios");
  promise_user.then(function (user) {
    console.log(user);
    var Email = user.email;
    var Senha = user.senha;
    if(Email == email && Senha == senha){
        res.cookie('login', Email);
        console.log(req.cookies);

    }else{
        console.log("login errado");
    };
    if (req.cookies && req.cookies.login) {
        res.render('index', {
            title: 'Secret webpage',
            user: req.cookies.email
        });
        console.log("aqui");
        return ;
    } else {
        res.redirect('/login');
    }
});
  });
  
http.createServer(app).listen(8000);

