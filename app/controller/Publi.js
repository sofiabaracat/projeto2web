let fs = require('fs'),
    util = require('util'),
    Publicacao = require('../Model/Publicacao');



module.exports = class Publi {
    constructor (req, res) {
        this.req = req;
        this.res = res;
    }


    createPubli () {
        let self = this,
            p = new Publicacao({});
        p.titulo = this.req.query.titulo;
        p.texto = this.req.query.texto;
        p.usuario = this.req.cookies.nome;
        p.save();
        this.res.writeHead(302, { 'Location': '/' });
        this.res.end();
    }

};