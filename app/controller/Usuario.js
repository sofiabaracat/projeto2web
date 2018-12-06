let fs = require('fs'),
    util = require('util'),
    User = require('../Model/User');



module.exports = class Usuario {
    constructor (req, res) {
        this.req = req;
        this.res = res;
    }


    create () {
        let self = this,
            u = new User({});
        u.nome = this.req.body.nome;
        u.email = this.req.body.email;
        u.senha = this.req.body.senha;    
        u.save();
        this.res.writeHead(302, { 'Location': '/' });
        this.res.end();
    }

};